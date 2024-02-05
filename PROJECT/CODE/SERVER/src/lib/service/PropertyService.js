// -- TYPES

export class PropertyService
{
    // -- CONSTRUCTORS

    constructor(
        database
        )
    {
        this.database = database;
    }

    // -- OPERATIONS

    async getPropertyArray(
        )
    {
        let connection = await this.database.getConnection();
        let [ rowArray, fieldArray ] = await connection.query( 'select * from PROPERTY' );
        connection.release();

        return rowArray;
    }

    // ~~

    async getFavoritePropertyArray(
        )
    {
        let connection = await this.database.getConnection();
        let [ rowArray, fieldArray ] = await connection.query( 'select * from PROPERTY where isFavorite = true' );
        connection.release();

        return rowArray;
    }

    // ~~

    async getPropertyById(
        id
        )
    {
        let connection = await this.database.getConnection();
        let [ rowArray, fieldArray ] = await connection.query( 'select * from PROPERTY where id = ?', [ id ] );
        connection.release();

        return rowArray.length > 0 ? rowArray[ 0 ] : null;
    }
}
