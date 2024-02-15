<script>
    // -- IMPORTS

    import axios from 'axios';
    import { onMount } from 'svelte';
    import { Link } from 'svelte-routing';

    // -- STATEMENTS

    let propertyArray = [];
    let isLoading = true;

    onMount(
        async () =>
        {
            try
            {
                let response = await axios.post( '/page/properties' );
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

{ #if isLoading }
    <div class="hourglass">Loading...</div>
{ :else }
    <div>
        <h1>Properties</h1>
        { #each propertyArray as property }
            <Link to={ `/property/${property.id}` }>
                <div class="property">
                    <p>{ property.title }</p>
                </div>
            </Link>
        { /each}
    </div>
{ /if }
