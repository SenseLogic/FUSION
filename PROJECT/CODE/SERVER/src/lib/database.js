// -- IMPORTS

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// -- CONSTANTS

export let
    databaseName = 'public';

// -- STATEMENTS

export const database
    = createClient(
          process.env.FUSION_PROJECT_DATABASE_URL,
          process.env.FUSION_PROJECT_DATABASE_KEY
          );
