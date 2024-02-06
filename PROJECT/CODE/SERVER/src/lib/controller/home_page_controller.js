// -- IMPORTS

import { propertyService } from '../service/property_service';

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
