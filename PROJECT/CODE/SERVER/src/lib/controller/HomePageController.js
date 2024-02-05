// -- TYPES

export class HomePageController
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
                favoritePropertyArray : this.propertyService.getFavoritePropertyArray()
            }
            );
    }
}
