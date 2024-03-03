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
        reply
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
