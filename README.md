B2C API React Example
===========
## React single page application with devserver, typescript, redux for Spryker Glue API.

This application is released for the sole purpose of illustrating API usage. It is part of the documentation and should not under any circumstances be used as a starting point for any project. Excluded from MIT-License are all "product images, product data, other images, and fonts”. These are for display purposes only and are subject to their own rights of use, which must be purchased independently.

## Requirements

- [Node](https://nodejs.org) 8.9.3 or newer

- [npm](https://www.npmjs.com/get-npm) 6.4.1 or newer

## Setting environment
0. Make sure you have installed spryker virtual machine(https://documentation.spryker.com/dev-getting-started.htm) and installed API modules you needed.
1. Nginx configuration. Inside your virtual machine (`nginx/spryker/glue.conf` path) at the `PHP application location block`, add code below:
    <details>
        <summary>Show settings</summary>
        <pre>
        if ($http_origin = "{{ALLOWED_ORIGIN}}") {
            set $cors "true";
        }
        if ($request_method = 'OPTIONS') {
            set $cors "${cors} o";
        }
        if ($cors = "true o") {
            more_set_headers 'Access-Control-Allow-Origin: $http_origin';
            more_set_headers 'Access-Control-Allow-Credentials: true';
            more_set_headers 'Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Anonymous-Customer-Unique-Id';
            more_set_headers 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE';
            add_header Content-Type text/plain;
            add_header Content-Length 0;
            return 204;
        }
        if ($cors = "true") {
            more_set_headers 'Access-Control-Allow-Origin: $http_origin';
            more_set_headers 'Access-Control-Allow-Credentials: true';
            more_set_headers 'Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Anonymous-Customer-Unique-Id';
            more_set_headers 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE';
            more_set_headers 'Access-Control-Expose-Headers: Content-Length, Content-Range';
        }
        </pre>
        Please, replace {{ALLOWED_ORIGIN}} with yours. For example "http://react.local:3000".
        Don`t forget restart nginx after new added settings.
    </details>
2. Please add settings in your local machine "hosts" file.
    - `127.0.0.1 react.local`.
3. Please invoke command below to change permission keys inside `config/Zed` folder: 
    - `chmod 600 dev_only_*` .
4. Clone it inside `/project/public/Glue/` folder.
5. Please copy `.env.example` file and rename it to `.env` for configure your local environment. 
    - `DEV_SERVER_HOST` variable value. For example `react.local`. 
    - `API_URL` variable value to `http://glue.de.project-name.local`.

## Installation
Once you installed nodejs, cloned git repository and switched to the project directory

```sh
npm i
```

```sh
npm run dev
```

