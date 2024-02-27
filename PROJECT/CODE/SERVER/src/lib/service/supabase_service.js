// -- IMPORTS

import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

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
        response
        )
    {
        if ( this.client === null )
        {
            if ( request !== undefined )
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
                                        return decodeURIComponent( request.cookies[ key ] ?? '' )
                                    },
                                set:
                                    ( key, value, options ) =>
                                    {
                                        if ( response )
                                        {
                                            response.cookie(
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
                                        if ( response )
                                        {
                                            response.cookie(
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
                        )( request, reply );
            }
            else
            {
                this.client =
                    createClient(
                        process.env.FUSION_PROJECT_DATABASE_URL,
                        process.env.FUSION_PROJECT_DATABASE_KEY
                        );
            }
        }

        return this.client;
    }
}

// -- VARIABLES

export let supabaseService
    = new SupabaseService();
