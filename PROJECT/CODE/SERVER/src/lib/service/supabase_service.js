// -- IMPORTS

import { createServerClient } from '@supabase/ssr';
import fs from 'fs/promises';
import { logError } from 'senselogic-opus';

// -- STATEMENTS

class SupabaseService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.anonymousClient = null;
        this.databaseKey = process.env.FUSION_PROJECT_SUPABASE_DATABASE_KEY;
        this.databaseUrl = process.env.FUSION_PROJECT_SUPABASE_DATABASE_URL;
        this.storageName = process.env.FUSION_PROJECT_SUPABASE_STORAGE_NAME;
        this.storageUrl = process.env.FUSION_PROJECT_SUPABASE_STORAGE_URL;
    }

    // -- INQUIRIES

    getFileUrl(
        filePath
        )
    {
        return this.storageUrl + '/' + filePath;
    }

    // -- OPERATIONS

    getAnonymousClient(
        request,
        reply
        )
    {
        if ( this.anonymousClient === null )
        {
            this.anonymousClient = createServerClient( this.databaseUrl, this.databaseKey );
        }

        return this.anonymousClient;
    }

    // ~~

    getAuthenticatedClient(
        request,
        reply
        )
    {
        return (
            createServerClient(
                this.databaseUrl,
                this.databaseKey,
                {
                    cookies:
                    {
                        getAll:
                            ( ) =>
                            {
                                if ( request && request.cookies )
                                {
                                    return Object.keys( request.cookies ).map(
                                        ( key ) =>
                                        ( 
                                            {
                                                name: key,
                                                value: decodeURIComponent( request.cookies[ key ] ?? '' )
                                            } 
                                        )
                                        );
                                }
                                else
                                {
                                    return [];
                                }
                            },
                        set:
                            ( cookie ) =>
                            {
                                if ( reply )
                                {
                                    reply.setCookie(
                                        cookie.name,
                                        encodeURIComponent( cookie.value ),
                                        {
                                            ...cookie.options,
                                            sameSite: 'Lax',
                                            httpOnly: true
                                        }
                                        );
                                }
                            },
                        remove:
                            ( cookie ) =>
                            {
                                if ( reply )
                                {
                                    reply.clearCookie(
                                        cookie.name,
                                        {
                                            ...cookie.options,
                                            httpOnly: true
                                        }
                                        );
                                }
                            }
                    }
                }
                )
            );
    }

    // ~~ 

    
    getClient(
        request,
        reply
        )
    {
        if ( !request || !reply )
        {
            return this.getAnonymousClient( request, reply );
        }
        else
        {
            return this.getAuthenticatedClient( request, reply );
        }
    }
    
    // ~~

    async uploadFile(
        localFile,
        storageFilePath,
        storageFileIsOverwritten = false
        )
    {
        let { data, error } =
            await this.getClient( null, null )
                .storage
                .from( this.storageName )
                .upload(
                      storageFilePath,
                      localFile,
                      {
                          cacheControl: '3600',
                          upsert: storageFileIsOverwritten
                      }
                      );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async copyFile(
        localFile,
        storageFilePath,
        storageFileIsOverwritten = false
        )
    {
        let fileData;
        
        if ( typeof localFile === 'string' )
        {
            fileData = await fs.readFile( localFile );
        }
        else
        {
            fileData = localFile;
        }

        return await this.uploadFile( fileData, storageFilePath, storageFileIsOverwritten );
    }

    // ~~

    async removeFile(
        storageFilePath
        )
    {
        let { data, error } =
            await this.getClient( null, null )
                .storage
                .from( this.storageName )
                .remove( [ storageFilePath ] );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async signUpUser(
        email,
        password
        )
    {
        let { user, error } =
            await this.getClient( null, null ).auth.signUp(
                  {
                      email,
                      password
                  }
                  );

        if ( error !== null )
        {
            logError( error );
        }

        return user;
    }

    // ~~

    async signInUser(
        email,
        password
        )
    {
        let { user, error } =
            await this.getClient( null, null ).auth.signInWithPassword(
                  {
                      email,
                      password
                  }
                  );

        if ( error !== null )
        {
            logError( error );
        }

        return user;
    }

    // ~~

    async signOutUser(
        )
    {
        let { error } =
            await this.getClient( null, null ).auth.signOut();

        if ( error !== null )
        {
            logError( error );
        }
    }
}

// -- VARIABLES

export let supabaseService
    = new SupabaseService();
