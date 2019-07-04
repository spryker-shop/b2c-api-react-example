B2C API React Example
===========
## React single page application with devserver, typescript, redux for Spryker Glue API.

This application is released for the sole purpose of illustrating API usage. It is part of the documentation and should not under any circumstances be used as a starting point for any project. Excluded from MIT-License are all "product images, product data, other images, and fonts”. These are for display purposes only and are subject to their own rights of use, which must be purchased independently.

## Requirements

- [Node](https://nodejs.org) 8.9.3 or newer

- [npm](https://www.npmjs.com/get-npm) 6.4.1 or newer

## Setting environment
0. Make sure you have installed spryker virtual machine(https://documentation.spryker.com/dev-getting-started.htm) and installed API modules you needed.
1. Nginx configuration. 
    - Inside your virtual machine, you should create `DE_development_glue` file, inside `nginx/sites-available` and make a symlink in `nginx/sites-enabled` directory. 
    <details>
        <summary>Show settings</summary>
        <pre>
        server {
            &#35; Listener for production/staging - requires external LoadBalancer directing traffic to this port
            listen 10001;
            &#35; Listener for testing/development - one host only, doesn't require external LoadBalancer
            listen 80;
            server_name ~^glue\\.de\\..+\\.local$;
            keepalive_timeout 0;
            access_log  /data/logs/development/glue-access.log extended;
            root /data/shop/development/current/public/Glue;
            set $application_env development;
            set $application_store DE;
            proxy_read_timeout 600s;
            proxy_send_timeout 600s;
            fastcgi_read_timeout 600s;
            client_body_timeout 600s;
            client_header_timeout 600s;
            send_timeout 600s;
            location / {
                add_header X-Server $hostname;
                fastcgi_pass backend-$application_env-zed;
                fastcgi_index index.php;
                include /etc/nginx/fastcgi_params;
                fastcgi_param SCRIPT_NAME /index.php;
                fastcgi_param APPLICATION_ENV $application_env;
                fastcgi_param APPLICATION_STORE $application_store;
                fastcgi_param SCRIPT_FILENAME  $document_root/index.php;
                more_clear_headers 'X-Powered-By' 'X-Store' 'X-Locale' 'X-Env' 'Server';  
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
            }
        }
        </pre>
        Please, replace {{ALLOWED_ORIGIN}} with yours. For example "http://react.local:3000".
        Don`t forget restart nginx after new added settings.
    </details>
2. Please add settings in your local machine "hosts" file.
    - `<ip of vagrant installation> glue.de.project-name.local`
    - `127.0.0.1 react.local`
3. Please copy `.env.example` file and rename it to `.env` for configure your local environment. 
    - `DEV_SERVER_HOST` variable value. For example `react.local`. 
    - `API_URL` variable value to `http://glue.de.project-name.local`.
    - change `NODE_ENV` variable value to `production` while deploying on the server.

## Installation
Once you installed nodejs, cloned git repository and switched to the project directory

```sh
npm i
```

```sh
npm run dev
```

