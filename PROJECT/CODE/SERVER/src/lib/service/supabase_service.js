// -- IMPORTS

import { createServerClient } from '@supabase/ssr';

// -- STATEMENTS

class SupabaseService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.client = null;
    }

    // -- OPERATIONS

    getClient(
        request,
        reply
        )
    {
        if ( this.client === null )
        {
            this.client =
                createServerClient(
                    process.env.FUSION_PROJECT_DATABASE_URL,
                    process.env.FUSION_PROJECT_DATABASE_KEY,
                    {
                        cookies:
                        {
                            get:
                                ( key ) =>
                                {
                                    if ( request
                                         && request.cookies )
                                    {
                                        return decodeURIComponent( request.cookies[ key ] ?? '' )
                                    }
                                    else
                                    {
                                        return '';
                                    }
                                },
                            set:
                                ( key, value, options ) =>
                                {
                                    if ( reply )
                                    {
                                        reply.cookie(
                                            key,
                                            encodeURIComponent( value ),
                                            {
                                                ...options,
                                                sameSite: 'Lax',
                                                httpOnly: true
                                            }
                                            );
                                    }
                                },
                            remove:
                                ( key, options ) =>
                                {
                                    if ( reply )
                                    {
                                        reply.cookie(
                                            key,
                                            '',
                                            {
                                                ...options,
                                                httpOnly: true
                                            }
                                            );
                                    }
                                }
                        }
                    }
                    );
        }

        return this.client;
    }
}

// -- VARIABLES

export let supabaseService
    = new SupabaseService();
