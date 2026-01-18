<script runes>
    // -- IMPORTS

    import { getLocalizedText } from 'senselogic-lingo';
    import axios from 'axios';
    import { getHostRoute } from '../base.js';

    // -- EXPORTS

    let { id } = $props();

    // -- STATEMENTS

    let property = $state(null);
    let isLoading = $state(true);

    $effect(
        async () =>
        {
            if ( !id ) return;
            
            isLoading = true;
            property = null;
            
            try
            {
                let response = await axios.post( getHostRoute( '/api/page/property/' + id ) );
                property = response.data.property;
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
</style>

{#if isLoading }
    <div class="hourglass">Loading...</div>
{:else if property}
    <div>
        <h1>{ getLocalizedText( property.title ) }</h1>
        <p>{ getLocalizedText( property.description ) }</p>
    </div>
{:else}
    <div>Property not found</div>
{/if}
