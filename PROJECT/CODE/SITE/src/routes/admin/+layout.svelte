<script lang="ts">
    // CUSTOMIZATION POINT — not overwritten by update_client_code.js

    // -- IMPORTS

    import '$admin/app.styl';

    // -- VARIABLES

    let { children } = $props();
</script>

<img class="logo" src="/admin/logo.png" alt="logo">
<nav>
    <a href="/admin">Home</a>
    <a href="/admin/properties">Properties</a>
</nav>
<div>
    {@render children()}
</div>
