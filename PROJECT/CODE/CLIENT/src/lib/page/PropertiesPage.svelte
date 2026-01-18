<script runes>
    // -- IMPORTS

    import axios from 'axios';
    import { getLocalizedText } from 'senselogic-lingo';
    import { onMount } from 'svelte';
    import { link } from '@dvcol/svelte-simple-router/router';
    import { getHostRoute } from '../base.js';

    // -- STATEMENTS

    let propertyArray = $state([]);
    let isLoading = $state(true);

    onMount(
        async () =>
        {
            try
            {
                let response = await axios.post( getHostRoute( '/api/page/properties' ) );
                propertyArray = response.data.propertyArray;
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
        <h1>Properties</h1>
        {#each propertyArray as property }
            <a href={ '/property/' + property.id } use:link>
                <div class="property">
                    <p>{ getLocalizedText( property.title ) }</p>
                </div>
            </a>
        {/each}
    </div>
{/if}
