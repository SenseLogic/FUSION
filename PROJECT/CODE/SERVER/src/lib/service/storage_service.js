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
        if ( filePath.startsWith( '/upload/' ) )
        {
            return process.env.PRIVATE_FUSION_PROJECT_STORAGE_URL + filePath;
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
            if ( imagePath.endsWith( '.jpg' ) )
            {
                imagePath += '.' + imageWidth + '.jpg';
            }
            else if ( imagePath.endsWith( '.png' ) )
            {
                imagePath += '.' + imageWidth + '.png';
            }
        }

        return this.getFilePath( imagePath );
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
                .from( process.env.PRIVATE_FUSION_PROJECT_STORAGE_URL )
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

