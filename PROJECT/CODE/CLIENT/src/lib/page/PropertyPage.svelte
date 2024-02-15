<script>
    // -- IMPORTS

    import { onMount } from 'svelte';
    import axios from 'axios';

    // -- EXPORTS

    export let id;

    // -- STATEMENTS

    let property;
    let isLoading = true;

    onMount(
        async () =>
        {
            try
            {
                let response = await axios.post( `http://localhost:8000/page/property/${ id }` );
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

{ #if isLoading }
    <div class="hourglass">Loading...</div>
{ :else }
    <div>
        <h1>{ property.title }</h1>
        <p>{ property.description }</p>
    </div>
{ /if }
