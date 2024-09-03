// -- IMPORTS

import { logError } from 'senselogic-gist';
import { supabaseService } from './supabase_service';

// -- TYPES

class AuthentificationService
{
    // -- INQUIRIES

    getClient(
        )
    {
        return supabaseService.getClient();
    }

    // -- OPERATIONS

    async signUpUser(
        email,
        password
        )
    {
        let { user, error } =
            await supabaseService.getClient().auth.signUp(
                  {
                      email,
                      password
                  }
                  );

        if ( error !== null )
        {
            logError( error );
        }

        return user;
    }

    // ~~

    async signInUser(
        email,
        password
        )
    {
        let { user, error } =
            await supabaseService.getClient().auth.signIn(
                  {
                      email,
                      password
                  }
                  );

        if ( error !== null )
        {
            logError( error );
        }

        return user;
    }

    // ~~

    async signOutUser(
        )
    {
        let { error } =
            await supabaseService.getClient().auth.signOut();

        if ( error !== null )
        {
            logError( error );
        }
    }
}

// -- VARIABLES

export let authentificationService
    = new AuthentificationService();
