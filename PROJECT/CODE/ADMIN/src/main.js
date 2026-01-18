// -- IMPORTS

import { mount } from 'svelte';
import './app.styl';
import App from './App.svelte';

// -- STATEMENTS

const app = mount(
    App,
    {
        target: document.getElementById( 'app' ),
        props: {
            url: window.location.pathname
        }
    }
);

export default app;
