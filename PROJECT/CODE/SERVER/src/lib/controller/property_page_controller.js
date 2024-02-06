// -- IMPORTS

import { propertyService } from '../service/property_service';

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
