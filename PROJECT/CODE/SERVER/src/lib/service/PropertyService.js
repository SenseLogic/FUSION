// -- IMPORTS

import { getMapById, logError } from 'senselogic-gist';
import { propertyTable } from '../database';

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

    async getPropertyArray(
        )
    {
        return (
            await propertyTable.selectRows()
            );
    }

    // ~~

    async getFavoritePropertyArray(
        )
    {
        return (
            await propertyTable.selectRows(
                {
                    where : [ [ 'isFavorite' ], '=', 1 ],
                    order : 'number'
                }
                )
            );
    }

    // ~~

    async getPropertyById(
        propertyId
        )
    {
        return (
            await propertyTable.selectRow(
                {
                    where : [ [ 'id' ], '=', propertyId ]
                }
                )
            );
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
}

// -- VARIABLES

export let propertyService
    = new PropertyService();
console.log( propertyService );
