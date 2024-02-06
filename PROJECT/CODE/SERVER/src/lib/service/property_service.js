// -- IMPORTS

import { getMapById, logError } from 'senselogic-gist';
import { database } from '../database';
import { spaceService } from '../service/space_service';

// -- FUNCTIONS

class PropertyService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.cachedPropertyArray = null;
        this.cachedPropertyByIdMap = null;
    }

    // -- INQUIRIES

    inflateProperty(
        property,
        propertySpaceArray
        )
    {
        property.spaceArray = propertySpaceArray;
        property.spaceByIdMap = getMapById( propertySpaceArray );
    }

    // ~~

    inflatePropertyArray(
        propertyArray,
        spaceArray
        )
    {
        let propertyByIdMap = {};

        for ( let property of propertyArray )
        {
            property.spaceArray = [];
            property.spaceByIdMap = {};
            propertyByIdMap[ property.id ] = property;
        }

        for ( let space of spaceArray )
        {
            let property = propertyByIdMap[ space.propertyId ];
            property.spaceArray.push( space );
            property.spaceByIdMap[ space.id ] = space;
        }
    }

    // ~~

    async getPropertyArray(
        isInflated = false
        )
    {
        const { data, error }
            = await database
                  .from( 'PROPERTY' )
                  .select();

        if ( error !== null )
        {
            logError( error );
        }

        if ( data !== null )
        {
            if ( isInflated )
            {
                this.inflatePropertyArray(
                    data,
                    await spaceService.getSpaceArray()
                    );
            }
        }

        return data;
    }

    // ~~

    async getPropertyById(
        propertyId,
        isInflated = false
        )
    {
        const { data, error }
            = await database
                  .from( 'PROPERTY' )
                  .select()
                  .eq( 'id', propertyId );

        if ( error !== null )
        {
            logError( error );
        }

        if ( data !== null )
        {
            if ( isInflated )
            {
                this.inflateProperty(
                    data[ 0 ],
                    await spaceService.getSpaceArrayByPropertyId( data[ 0 ].id, true )
                    );
            }

            return data[ 0 ];
        }
        else
        {
            return null;
        }
    }

    // -- OPERATIONS

    clearCache(
        )
    {
        this.cachedPropertyArray = null;
        this.cachedPropertyByIdMap = null;
    }

    // ~~

    async getCachedPropertyArray(
        )
    {
        if ( this.cachedPropertyArray === null )
        {
            this.cachedPropertyArray = await this.getPropertyArray();
        }

        return this.cachedPropertyArray;
    }

    // ~~

    async getCachedPropertyByIdMap(
        )
    {
        if ( this.cachedPropertyByIdMap === null )
        {
            this.cachedPropertyByIdMap = getMapById( await this.getCachedPropertyArray() );
        }

        return this.cachedPropertyByIdMap;
    }

    // ~~

    async addProperty(
        property
        )
    {
        this.clearCache();

        const { data, error }
            = await database
                  .from( 'PROPERTY' )
                  .insert( property );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async setPropertyById(
        property,
        propertyId
        )
    {
        this.clearCache();

        const { data, error }
            = await database
                .from( 'PROPERTY' )
                .update( property )
                .eq( 'id', propertyId );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async removePropertyById(
        propertyId
        )
    {
        this.clearCache();

        const { data, error }
            = await database
                .from( 'PROPERTY' )
                .delete()
                .eq( 'id', propertyId );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }
}

// -- VARIABLES

export const propertyService
    = new PropertyService();
