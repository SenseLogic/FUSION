// -- IMPORTS

import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyMySQL from '@fastify/mysql';
import { PropertyService } from './lib/service/PropertyService';
import { HomePageController } from './lib/controller/HomePageController';
import { PropertiesPageController } from './lib/controller/PropertiesPageController';
import { PropertyPageController } from './lib/controller/PropertyPageController';

// -- STATEMENTS

let fastify = Fastify( { logger: true } );

fastify.register(
    fastifyCors,
    {
        origin: '*'
    }
    );

fastify.register(
    fastifyMySQL,
    {
        promise: true,
        connectionString: 'mysql://root:@localhost/fusion_project'
    }
    );

console.dir( fastify );
let propertyService = new PropertyService( fastify.mysql );
let homePageController = new HomePageController();
let propertiesPageController = new PropertiesPageController();
let propertyPageController = new PropertyPageController();

fastify.get(
    '/page/home',
    async ( request, reply ) =>
    {
        return await homePageController.processRequest( request, reply );
    }
    );

fastify.get(
    '/page/properties',
    async ( request, reply ) =>
    {
        return await propertiesPageController.processRequest( request, reply );
    }
    );

fastify.get(
    '/page/property/:id',
    async ( request, reply ) =>
    {
        return await propertyPageController.processRequest( request, reply );
    }
    );

fastify.ready(
    async err =>
    {
        if ( err )
        {
            throw err;
        }
        else
        {
            let start =
                async () =>
                {
                    try
                    {
                        await fastify.listen( { port: 3000 } );
                    }
                    catch ( error )
                    {
                        fastify.log.error( error );
                        process.exit( 1 );
                    }
                };

            start();
        }
    }
    );
