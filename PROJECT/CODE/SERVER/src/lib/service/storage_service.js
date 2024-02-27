// -- IMPORTS

import { logError } from 'senselogic-gist';
import { supabaseService } from './supabase_service';

// -- TYPES

export class StorageService
{
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

// -- FUNCTIONS

export function getStorageFilePath(
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

export function getStorageImagePath(
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

    return getStorageFilePath( imagePath );
}

// -- VARIABLES

export let storageService = new StorageService();

