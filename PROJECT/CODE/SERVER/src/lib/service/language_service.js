// -- IMPORTS

import { getMap, logError } from 'senselogic-opus';
import { supabaseService } from './supabase_service';

// -- FUNCTIONS

class LanguageService
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.cachedLanguageArray = null;
        this.cachedLanguageArrayTimestamp = 0;
        this.cachedLanguageByCodeMap = null;
    }

    // -- INQUIRIES

    async getLanguageArray(
        )
    {
        let { data, error } =
            await supabaseService.getClient( null, null )
                .from( 'LANGUAGE' )
                .select();

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async getLanguageByCode(
        languageCode
        )
    {
        let { data, error } =
            await supabaseService.getClient( null, null )
                .from( 'LANGUAGE' )
                .select()
                .eq( 'code', languageCode );

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
        this.cachedLanguageArray = null;
        this.cachedLanguageByCodeMap = null;
    }

    // ~~

    async getCachedLanguageArray(
        )
    {
        if ( this.cachedLanguageArray === null
             || Date.now() > this.cachedLanguageArrayTimestamp + 300000 )
        {
            this.cachedLanguageArray = await this.getLanguageArray();
            this.cachedLanguageArrayTimestamp = Date.now();
            this.cachedLanguageByCodeMap = null;
        }

        return this.cachedLanguageArray;
    }

    // ~~

    async getCachedLanguageByCodeMap(
        )
    {
        if ( this.cachedLanguageByCodeMap === null
             || Date.now() > this.cachedLanguageArrayTimestamp + 300000 )
        {
            this.cachedLanguageByCodeMap = getMap( await this.getCachedLanguageArray(), 'code' );
        }

        return this.cachedLanguageByCodeMap;
    }

    // ~~

    async addLanguage(
        language
        )
    {
        this.clearCache();

        let { data, error } =
            await supabaseService.getClient( null, null )
                .from( 'LANGUAGE' )
                .insert( language );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async setLanguageByCode(
        language,
        languageCode
        )
    {
        this.clearCache();

        let { data, error } =
            await supabaseService.getClient( null, null )
                .from( 'LANGUAGE' )
                .update( language )
                .eq( 'code', languageCode );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }

    // ~~

    async removeLanguageByCode(
        languageCode
        )
    {
        this.clearCache();

        let { data, error } =
            await supabaseService.getClient( null, null )
                .from( 'LANGUAGE' )
                .delete()
                .eq( 'code', languageCode );

        if ( error !== null )
        {
            logError( error );
        }

        return data;
    }
}

// -- VARIABLES

export let languageService
    = new LanguageService();
