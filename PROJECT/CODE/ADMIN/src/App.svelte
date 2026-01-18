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
            path: '/admin', 
            component: HomePage 
        },
        { 
            name: 'properties', 
            path: '/admin/properties', 
            component: PropertiesPage 
        },
        { 
            name: 'property', 
            path: '/admin/property/:id', 
            component: PropertyPage 
        }
    ];

    const options = { routes, url };
</script>

<img class="logo" src="/admin/logo.png" alt="logo">
<nav>
    <a href="/admin" use:link>Home</a>
    <a href="/admin/properties" use:link>Properties</a>
</nav>
<div>
    <RouterView {options} />
</div>
