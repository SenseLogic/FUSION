// -- IMPORTS

import { getMapByCode, logError } from 'senselogic-gist';
import { databaseService } from './database_service';

// -- FUNCTIONS

class CountryService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.cachedCountryArray = null;
        this.cachedCountryByCodeMap = null;
    }

    // -- INQUIRIES

    async getCountryArray(
        )
    {
        let { data, error }
            = await databaseService.getClient()
                  .from( 'COUNTRY' )
                  .select();

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async getCountryByCode(
        countryCode
        )
    {
        let { data, error }
            = await databaseService.getClient()
                  .from( 'COUNTRY' )
                  .select()
                  .eq( 'code', countryCode );

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

    // -- OPERATIONS

    clearCache(
        )
    {
        this.cachedCountryArray = null;
        this.cachedCountryByCodeMap = null;
    }

    // ~~

    async getCachedCountryArray(
        )
    {
        if ( this.cachedCountryArray === null )
        {
            this.cachedCountryArray = await this.getCountryArray();
        }

        return this.cachedCountryArray;
    }

    // ~~

    async getCachedCountryByCodeMap(
        )
    {
        if ( this.cachedCountryByCodeMap === null )
        {
            this.cachedCountryByCodeMap = getMapByCode( await this.getCachedCountryArray() );
        }

        return this.cachedCountryByCodeMap;
    }

    // ~~

    async addCountry(
        country
        )
    {
        this.clearCache();

        let { data, error }
            = await databaseService.getClient()
                  .from( 'COUNTRY' )
                  .insert( country );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async setCountryByCode(
        country,
        countryCode
        )
    {
        this.clearCache();

        let { data, error }
            = await databaseService.getClient()
                .from( 'COUNTRY' )
                .update( country )
                .eq( 'code', countryCode );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async removeCountryByCode(
        countryCode
        )
    {
        this.clearCache();

        let { data, error }
            = await databaseService.getClient()
                .from( 'COUNTRY' )
                .delete()
                .eq( 'code', countryCode );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }
}

// -- VARIABLES

export let countryService
    = new CountryService();
