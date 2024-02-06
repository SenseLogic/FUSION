// -- IMPORTS

import { getMapById, logError } from 'senselogic-gist';
import { database } from '../database';
import { spaceTypeService } from '../service/space_type_service';

// -- FUNCTIONS

class SpaceService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.cachedSpaceArray = null;
        this.cachedSpaceByIdMap = null;
    }

    // -- INQUIRIES

    inflateSpaceArray(
        spaceArray,
        spaceTypeByIdMap
        )
    {
        for ( let space of spaceArray )
        {
            space.type = spaceTypeByIdMap[ space.typeId ];
        }
    }

    // ~~

    async getSpaceArray(
        )
    {
        const { data, error }
            = await database
                  .from( 'SPACE' )
                  .select();

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async getSpaceById(
        spaceId
        )
    {
        const { data, error }
            = await database
                  .from( 'SPACE' )
                  .select()
                  .eq( 'id', spaceId );

        if ( error !== null )
        {
            logError( error );
        }

        if ( data !== null )
        {
            return data[ 0 ];
        }
        else
        {
            return null;
        }
    }

    // ~~

    async getSpaceArrayByPropertyId(
        propertyId,
        isInflated = false
        )
    {
        const { data, error }
            = await database
                  .from( 'SPACE' )
                  .select()
                  .eq( 'propertyId', propertyId );

        if ( error !== null )
        {
            logError( error );
        }

        if ( data !== null )
        {
            if ( isInflated )
            {
                this.inflateSpaceArray(
                    data,
                    await spaceTypeService.getCachedSpaceTypeByIdMap()
                    );
            }
        }

        return data;
    }

    // ~~

    async getSpaceArrayByPropertyIdArray(
        propertyIdArray
        )
    {
        const { data, error }
            = await database
                  .from( 'SPACE' )
                  .select()
                  .in( 'propertyId', propertyIdArray );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // -- OPERATIONS

    clearCache(
        )
    {
        this.cachedSpaceArray = null;
    }

    // ~~

    async getCachedSpaceArray(
        )
    {
        if ( this.cachedSpaceArray === null )
        {
            this.cachedSpaceArray = await this.getSpaceArray();
        }

        return this.cachedSpaceArray;
    }

    // ~~

    async getCachedSpaceByIdMap(
        )
    {
        if ( this.cachedSpaceByIdMap === null )
        {
            this.cachedSpaceByIdMap = getMapById( await this.getCachedSpaceArray() );
        }

        return this.cachedSpaceByIdMap;
    }

    // ~~

    async addSpace(
        space
        )
    {
        this.clearCache();

        const { data, error }
            = await database
                  .from( 'SPACE' )
                  .insert( space );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async setSpaceById(
        space,
        spaceId
        )
    {
        this.clearCache();

        const { data, error }
            = await database
                .from( 'SPACE' )
                .update( space )
                .eq( 'id', spaceId );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async removeSpaceById(
        spaceId
        )
    {
        this.clearCache();

        const { data, error }
            = await database
                .from( 'SPACE' )
                .delete()
                .eq( 'id', spaceId );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }
}

// -- VARIABLES

export const spaceService
    = new SpaceService();
