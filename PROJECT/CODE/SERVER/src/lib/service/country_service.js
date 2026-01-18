// -- IMPORTS

import { getMap, logError } from 'senselogic-opus';
import { supabaseService } from './supabase_service';

// -- FUNCTIONS

class CountryService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.cachedCountryArray = null;
        this.cachedCountryArrayTimestamp = 0;
        this.cachedCountryByCodeMap = null;
    }

    // -- INQUIRIES

    async getCountryArray(
        )
    {
        let { data, error } =
            await supabaseService.getClient( null, null )
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
        let { data, error } =
            await supabaseService.getClient( null, null )
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
        if ( this.cachedCountryArray === null
             || Date.now() > this.cachedCountryArrayTimestamp + 300000 )
        {
            this.cachedCountryArray = await this.getCountryArray();
            this.cachedCountryArrayTimestamp = Date.now();
            this.cachedCountryByCodeMap = null;
        }

        return this.cachedCountryArray;
    }

    // ~~

    async getCachedCountryByCodeMap(
        )
    {
        if ( this.cachedCountryByCodeMap === null
             || Date.now() > this.cachedCountryArrayTimestamp + 300000 )
        {
            this.cachedCountryByCodeMap = getMap( await this.getCachedCountryArray(), 'code' );
        }

        return this.cachedCountryByCodeMap;
    }

    // ~~

    async addCountry(
        country
        )
    {
        this.clearCache();

        let { data, error } =
            await supabaseService.getClient( null, null )
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

        let { data, error } =
            await supabaseService.getClient( null, null )
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

        let { data, error } =
            await supabaseService.getClient( null, null )
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
