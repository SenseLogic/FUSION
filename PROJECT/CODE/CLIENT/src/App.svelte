<script runes>
    // -- IMPORTS

    import { RouterView } from '@dvcol/svelte-simple-router/components';
    import { link } from '@dvcol/svelte-simple-router/router';
    import HomePage from './lib/page/HomePage.svelte';
    import PropertiesPage from './lib/page/PropertiesPage.svelte';
    import PropertyPage from './lib/page/PropertyPage.svelte';

    // -- PROPS

    let { url = "" } = $props();

    // -- ROUTES

    const routes = [
        { 
            name: 'home', 
            path: '/', 
            component: HomePage 
        },
        { 
            name: 'properties', 
            path: '/properties', 
            component: PropertiesPage 
        },
        { 
            name: 'property', 
            path: '/property/:id', 
            component: PropertyPage 
        }
    ];

    const options = { routes, url };
</script>

<img class="logo" src="logo.png" alt="logo">
<nav>
    <a href="/" use:link>Home</a>
    <a href="/properties" use:link>Properties</a>
</nav>
<div>
    <RouterView {options} />
</div>
