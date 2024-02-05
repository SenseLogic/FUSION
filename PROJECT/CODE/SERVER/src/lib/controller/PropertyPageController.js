// -- TYPES

export class PropertyPageController
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
        let property = await this.propertyService.getPropertyById( request.params.id );

        return (
            {
                property : property ?? null
            }
            );
    }
}
