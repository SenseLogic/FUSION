// -- IMPORTS

import { propertyService } from '../service/PropertyService';

// -- TYPES

export class PropertyPageController
{
    // -- OPERATIONS

    async processRequest(
        request,
        reply
        )
    {
        return (
            {
                property : await propertyService.getPropertyById( request.params.id )
            }
            );
    }
}
