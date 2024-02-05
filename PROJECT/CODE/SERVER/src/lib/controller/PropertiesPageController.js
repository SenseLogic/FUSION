// -- TYPES

export class PropertiesPageController
{
    // -- CONSTRUCTORS

    constructor(
        propertyService
        )
    {
        this.propertyService = propertyService;
    }

    // -- OPERATIONS

    async processRequest(
        request,
        reply
        )
    {
        return (
            {
                propertyArray : this.propertyService.getPropertyArray()
            }
            );
    }
}
