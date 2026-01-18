<script runes>
    // -- IMPORTS

    import axios from 'axios';
    import { getLocalizedText } from 'senselogic-lingo';
    import { onMount } from 'svelte';
    import { link } from '@dvcol/svelte-simple-router/router';
    import { getHostRoute } from '../base.js';

    // -- VARIABLES

    let favoritePropertyArray = $state([]);
    let isLoading = $state(true);

    // -- STATEMENTS

    onMount(
        async () =>
        {
            try
            {
                let response = await axios.post( getHostRoute( '/api/page/home' ) );
                favoritePropertyArray = response.data.favoritePropertyArray;
            }
            catch ( error )
            {
                console.error( 'Error :', error );
            }
            finally
            {
                isLoading = false;
            }
        }
        );
</script>

<style>
    .hourglass
    {
    }

    .property
    {
    }
</style>

{#if isLoading }
    <div class="hourglass">Loading...</div>
{:else}
    <div>
        <h1>Favorite Properties</h1>
        {#each favoritePropertyArray as property }
            <a href={ '/property/' + property.id } use:link>
                <div class="property">
                    <p>{ getLocalizedText( property.title ) }</p>
                </div>
            </a>
        {/each}
        <a href="/properties" use:link>See more</a>
    </div>
{/if}
