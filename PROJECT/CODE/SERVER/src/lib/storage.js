// -- IMPORTS

import dotenv from 'dotenv';

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

