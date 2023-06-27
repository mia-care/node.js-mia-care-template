# nodejs-mia-care-template

## Summary

%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%

## Local Development

To develop the service locally you need:

- Node 10+

To setup node, please if possible try to use [nvm][nvm], so you can manage multiple
versions easily. Once you have installed nvm, you can go inside the directory of the project and simply run
`nvm install`, the `.nvmrc` file will install and select the correct version if you don’t already have it.

Once you have all the dependency in place, you can launch:

```shell
npm i
npm run coverage
```

This two commands, will install the dependencies and run the tests with the coverage report that you can view as an HTML
page in `coverage/lcov-report/index.html`.
After running the coverage you can create your local copy of the default values for the `env` variables needed for
launching the application.

```shell
cp ./default.env ./local.env
```

From now on, if you want to change anyone of the default values for the variables you can do it inside the `local.env`
file without pushing it to the remote repository.

Once you have all your dependency in place you can launch:

```shell
set -a && source local.env
npm start
```

After that you will have the service exposed on your machine. In order to verify that the service is working properly you could launch in another terminal shell:

```shell
curl http://localhost:3000/-/ready
```

As a result the terminal should return you the following message:

```json
{"name":"mia_template_service_name_placeholder","status":"OK","version":"0.1.0"}
```

## Contributing

To contribute to the project, please be mindful for this simple rules:

1. Don’t commit directly on master
2. Start your branches with `feature/` or `fix/` based on the content of the branch
3. If possible, refer to the Jira issue id, inside the name of the branch, but not call it only `fix/BAAST3000`
4. Always commit in english
5. Once you are happy with your branch, open a [Merge Request][merge-request]

## Run the Docker Image

If you are interested in the docker image you can get one and run it locally with this commands:

```shell
docker pull %NEXUS_HOSTNAME%/mia_template_image_name_placeholder:latest
set -a
source .env
docker run --name mia_template_service_name_placeholder \
  -e USERID_HEADER_KEY=${USERID_HEADER_KEY} \
  -e GROUPS_HEADER_KEY=${GROUPS_HEADER_KEY} \
  -e CLIENTTYPE_HEADER_KEY=${CLIENTTYPE_HEADER_KEY} \
  -e BACKOFFICE_HEADER_KEY=${BACKOFFICE_HEADER_KEY} \
  -e MICROSERVICE_GATEWAY_SERVICE_NAME=${MICROSERVICE_GATEWAY_SERVICE_NAME} \
  -e LOG_LEVEL=trace \
  -p 3000:3000 \
  --detach \
  %NEXUS_HOSTNAME%/mia_template_image_name_placeholder
```

[nvm]: https://github.com/creationix/nvm
[merge-request]: %GITLAB_BASE_URL%/%CUSTOM_PLUGIN_PROJECT_FULL_PATH%/merge_requests