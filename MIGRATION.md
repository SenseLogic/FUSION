The `CODE/SITE` folder must be updated to become a SvelteKit port of the existing Fastify-based server currently implemented in the `CODE/SERVER` folder.

Currently, the Svelte applications in the `CODE/CLIENT` and `CODE/ADMIN` folders are compiled into two separate sets of `index.html`, `index.css`, and `index.js` files, which are then served either by the Fastify server or by the Capacitor mobile shell.

The Fastify server also exposes all API routes used by the Svelte applications to fetch the data required to render their user interfaces.

The goal of the SvelteKit-based server is to completely replace the Fastify-based server while keeping the existing architecture and codebase as the source of truth. To achieve this, the SvelteKit project must:

* automatically copy all reusable server code (service classes, utilities, middleware, etc.) from the `CODE/SERVER` folder into equivalent sibling folders and subfolders within `CODE/SITE`, preserving the existing directory structure whenever possible and adapting the code only when required for SvelteKit compatibility;
* adapt every API route from the `CODE/SERVER` folder into an equivalent SvelteKit API endpoint while preserving its existing behavior and API contract;
* automatically copy all Svelte components from the `CODE/CLIENT` and `CODE/ADMIN` folders into equivalent sibling folders and subfolders within `CODE/SITE`, preserving their structure and adapting them only when required for SvelteKit compatibility;
* ensure that both authenticated and non-authenticated pages continue to obtain their data exclusively through the API routes rather than calling the underlying service classes directly, so that both SSR and CSR use the same application API;
* create SvelteKit page routes for publicly accessible pages so that their initial request is rendered using SEO-friendly server-side rendering (SSR), with the rendered page obtaining its data through the existing API routes. Subsequent client-side navigations may continue to render the same pages using CSR through the standard SvelteKit runtime.

During the migration, the `CODE/SERVER` folder serves only as the source from which the server code is ported into `CODE/SITE`. Once the port is complete and fully operational, the `CODE/SERVER` folder will be removed and the `CODE/SITE` folder will be renamed to `CODE/SERVER`.

A `CODE/SITE/CODE/port_server_code.bat` script calls a `port_server_code.js` script, which automatically copies the existing server code from the `CODE/SERVER` folder (primarily TypeScript files), applies the minimum transformations required for SvelteKit compatibility, and converts the Fastify routes into their SvelteKit equivalents.

A `CODE/SITE/CODE/update_client_code.bat` script calls an `update_client_code.js` script, which automatically copies the existing client code from the `CODE/CLIENT` and `CODE/ADMIN` folders (primarily Svelte components), applies the minimum transformations required for SvelteKit compatibility, and preserves the original component structure whenever possible.

Unless explicitly designated as customization points, client and admin files generated inside `CODE/SITE` should not be edited manually, as they may be overwritten by subsequent executions of the synchronization scripts.

Once the port is complete and fully operational, the project's lead developer will remove the `CODE/SERVER` folder and rename the `CODE/SITE` folder to `CODE/SERVER`. At that point, `port_server_code.bat` will no longer be needed, and only `update_client_code.bat` will continue to be used to keep the client and admin code synchronized.
