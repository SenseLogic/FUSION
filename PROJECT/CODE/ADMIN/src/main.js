// -- IMPORTS

import './app.css'
import App from './App.svelte'

// -- STATEMENTS

export default app =
    new App(
        {
            target: document.getElementById( 'app' )
        }
        );
