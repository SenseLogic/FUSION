<script lang="ts">
    // CUSTOMIZATION POINT — not overwritten by update_client_code.js

    // -- IMPORTS

    import '$client/app.styl';

    // -- VARIABLES

    let { children } = $props();
</script>

<img class="logo" src="/logo.png" alt="logo">
<nav>
    <a href="/">Home</a>
    <a href="/properties">Properties</a>
</nav>
<div>
    {@render children()}
</div>
