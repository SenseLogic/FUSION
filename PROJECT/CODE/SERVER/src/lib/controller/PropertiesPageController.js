// -- IMPORTS

import { propertyService } from '../service/PropertyService';

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
