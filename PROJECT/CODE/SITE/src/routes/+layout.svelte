<script lang="ts">
    // CUSTOMIZATION POINT — not overwritten by update_client_code.js

    // -- IMPORTS

    import favicon from '$lib/assets/favicon.svg';
    import { setLanguageCode, setLanguageSeparator } from 'senselogic-lingo';

    // -- VARIABLES

    let {
        children,
        data
    } = $props();

    // -- STATEMENTS

    setLanguageSeparator( '¨' );
    setLanguageCode( data.languageCode );
</script>

<svelte:head>
    <link rel="icon" href={ favicon } />
</svelte:head>

{@render children()}
