// -- IMPORTS

import fs from 'fs/promises';

// -- TYPES

class BunnyService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.baseUrl = process.env.FUSION_PROJECT_BUNNY_STORAGE_URL;
        this.storageName = process.env.FUSION_PROJECT_BUNNY_STORAGE_NAME;
        this.apiKey = process.env.FUSION_PROJECT_BUNNY_STORAGE_KEY;
    }

    // -- INQUIRIES

    getFileUrl(
        filePath
        )
    {
        return this.baseUrl + '/' + this.storageName + '/' + filePath;
    }

    // ~~

    async uploadFile(
        localFile,
        storageFilePath
        )
    {
        try
        {
            let response =
                await fetch(
                    this.getFileUrl( storageFilePath ),
                    {
                        method : 'PUT',
                        headers :
                            {
                                'AccessKey' : this.apiKey,
                                'Content-Type' : 'application/octet-stream'
                            },
                        body : localFile
                    }
                    );

            if ( !response.ok )
            {
                throw new Error( 'Failed to upload file: ' + response.statusText );
            }

            let data = null;
            
            try
            {
                let text = await response.text();
                
                if ( text.length > 0 )
                {
                    data = JSON.parse( text );
                }
            }
            catch
            {
            }

            return data;
        }
        catch ( error )
        {
            console.error( 'Error uploading file to Bunny CDN:', error );

            return null;
        }
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

        return await this.uploadFile( fileData, storageFilePath );
    }

    // ~~

    async removeFile(
        storageFilePath
        )
    {
        try
        {
            let response =
                await fetch(
                    this.getFileUrl( storageFilePath ),
                    {
                        method : 'DELETE',
                        headers :
                            {
                                'AccessKey' : this.apiKey
                            }
                    }
                    );

            if ( !response.ok )
            {
                throw new Error( 'Failed to remove file: ' + response.statusText );
            }

            let data = null;
            
            try
            {
                let text = await response.text();
                
                if ( text.length > 0 )
                {
                    data = JSON.parse( text );
                }
            }
            catch
            {
            }

            return data;
        }
        catch ( error )
        {
            console.error( 'Error removing file from Bunny CDN:', error );

            return null;
        }
    }
}

// -- VARIABLES

export let bunnyService
    = new BunnyService();
