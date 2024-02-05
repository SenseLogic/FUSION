// -- IMPORTS

import { Database } from 'senselogic-eureka';
import { Mysql2Driver } from 'senselogic-eureka-mysql2';

// -- STATEMENT

export let database = new Database( 'fusion_project' );

export let propertyTable
    = database.addTable(
        'PROPERTY',
        [
            [ 'id', 'TUID', [ 'key' ] ],
            [ 'number', 'FLOAT64' ],
            [ 'title', 'STRING' ],
            [ 'description', 'STRING' ],
            [ 'price', 'FLOAT64' ],
            [ 'streetAddress1', 'STRING' ],
            [ 'streetAddress2', 'STRING' ],
            [ 'cityCode', 'STRING' ],
            [ 'cityName', 'STRING' ],
            [ 'countryCode', 'STRING' ],
            [ 'isFavorite', 'BOOL' ]
        ]
        );

database.setDriver( new Mysql2Driver() );

(
    async () =>
    {
        await database.createConnectionPool(
            {
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: ''
            }
            );
    }
)();

console.log(database);
