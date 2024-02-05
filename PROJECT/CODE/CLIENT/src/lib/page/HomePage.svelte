<script>
    // -- IMPORTS

    import axios from 'axios';
    import { onMount } from 'svelte';
    import { Link } from 'svelte-routing';

    // -- STATEMENTS

    let favoritePropertyArray = [];
    let isLoading = true;

    onMount(
        async () =>
        {
            try
            {
                let response = await axios.get( 'http://localhost:3000/page/home' );
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

{ #if isLoading }
    <div class="hourglass">Loading...</div>
{ :else }
    <div>
        <h1>Favorite Properties</h1>
        { #each favoritePropertyArray as property }
            <div class="property">
                <p>{ property.name }</p>
            </div>
        { /each}
        <Link to="/properties">See more</Link>
    </div>
{ /if }
