// -- IMPORTS

import { logError } from 'senselogic-gist';
import { supabaseService } from './supabase_service';

// -- TYPES

export class StorageService
{
    // -- INQUIRIES

    getFilePath(
        filePath
        )
    {
        if ( filePath.startsWith( '/media/' ) )
        {
            return process.env.FUSION_PROJECT_MEDIA_URL + filePath;
        }
        else if ( filePath.startsWith( '/upload/' ) )
        {
            return process.env.FUSION_PROJECT_UPLOAD_URL + filePath;
        }
        else
        {
            return filePath;
        }
    }

    // ~~

    getStorageImagePath(
        imagePath,
        imageWidth
        )
    {
        if ( !isNaN( imageWidth ) )
        {
            let lastDotCharacterIndex = imagePath.lastIndexOf( '.' );

            return imagePath.slice( 0, lastDotCharacterIndex ) + '.' + imageWidth + imagePath.slice( lastDotCharacterIndex );
        }
        else
        {
            return this.getFilePath( imagePath );
        }
    }

    // -- OPERATIONS

    async uploadFile(
        localFile,
        storageFilePath,
        storageFileIsOverwritten = false
        )
    {
        let { data, error } =
            await supabase_service.getClient()
                .storage
                .from( process.env.FUSION_PROJECT_UPLOAD_URL )
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
}

// -- VARIABLES

export let storageService = new StorageService();
