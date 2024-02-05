// -- IMPORTS

import { propertyService } from '../service/PropertyService';

// -- TYPES

export class HomePageController
{
    // -- OPERATIONS

    async processRequest(
        request,
        reply
        )
    {
        return (
            {
                favoritePropertyArray : await propertyService.getFavoritePropertyArray()
            }
            );
    }
}
