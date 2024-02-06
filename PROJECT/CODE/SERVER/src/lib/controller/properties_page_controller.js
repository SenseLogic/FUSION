// -- IMPORTS

import { propertyService } from '../service/property_service';

// -- TYPES

export class PropertiesPageController
{
    // -- OPERATIONS

    async processRequest(
        request,
        reply
        )
    {
        return (
            {
                propertyArray : await propertyService.getPropertyArray()
            }
            );
    }
}
