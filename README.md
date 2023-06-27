# Node.js Template Walkthrough

This walkthrough will help you learn how to create a Node.js microservice from scratch.

## Create a microservice

In order to do so, access to [Mia-Platform DevOps Console](https://console.cloud.mia-platform.eu/login), create a new project and go to the **Design** area. From the Design area of your project select _Microservices_ and then create a new one, you have now reached [Mia-Platform Marketplace](../../marketplace/overview_marketplace)!  
In the marketplace you will see a set of Examples and Templates that can be used to set-up microservices with a predefined and tested function.

For this walkthrough select the following template: **Node.js Mia-Care template**. After clicking on this template you will be asked to give the following information:

- Name (Internal Hostname)
- GitLab Group Name
- GitLab Repository Name
- Docker Image Name
- Description (optional)

You can read more about this fields in [Manage your Microservices from the Dev Console](../../development_suite/api-console/api-design/services#how-to-create-a-microservice-from-an-example-or-from-a-template) section of Mia-Platform documentation.

Give your microservice the name you prefer, in this walkthrough we'll refer to it with the following name: **my-node-service-name**.
Then, fill the other required fields and confirm that you want to create a microservice. You have now generated a _my-node-service-name_ repository that is already deployed on Mia-Platform [Nexus Repository Manager](https://nexus.mia-platform.eu/) once build script in CI is successful.

## Save your changes

It is important to know that the microservice that you have just created is not saved yet on the DevOps Console. It is not essential to save the changes that you have made, since you will later make other modifications inside of your project in the DevOps Console.  
If you decide to save your changes now remember to choose a meaningful title for your commit (e.g "created service my_node_service_name"). After some seconds you will be prompted with a popup message which confirms that you have successfully saved all your changes.  
A more detailed description on how to create and save a node.js Microservice can be found in [Create a Node.js Microservice](../../development_suite/api-console/api-design/services#how-to-create-a-microservice-from-an-example-or-from-a-template) tutorial section of Mia-Platform documentation.

## Look inside your repository

After having created your first microservice (based on this template) you will be able to access to its git repository from the DevOps Console. Inside this repository you will find an [index.js](https://github.com/mia-platform-marketplace/Node.js-Custom-Plugin-Template/blob/master/index.js) file with the following lines of code:

```js
'use strict'

const {
  decorateReplyWithValidationError,
  decorateReplyWithAuthorizationError,
  decorateReplyWithForbiddenError,
  decorateReplyWithNotFoundError,
  decorateReplyWithInternalServerError,
  decorateReplyWithNotImplementedError,
  decorateReplyWithServiceUnavailableError,
} = require('./src/decorators/reply')

const { decorateRequestWithBuildErrorResponse } = require('./src/decorators/request')

const { envVarsSchema } = require('./src/schemas/envVarsSchema')
const customService = require('@mia-platform/custom-plugin-lib')(envVarsSchema)

const getHelloWorld = require('./src/endpoints/hello-world/get')

module.exports = customService(async function index(service) {
  service.register(getHelloWorld)

  decorateReplyWithValidationError(service)
  decorateReplyWithAuthorizationError(service)
  decorateReplyWithForbiddenError(service)
  decorateReplyWithNotFoundError(service)
  decorateReplyWithInternalServerError(service)
  decorateReplyWithNotImplementedError(service)
  decorateReplyWithServiceUnavailableError(service)

  decorateRequestWithBuildErrorResponse(service)
})
```

The `index.js` file already contains:
- the definition of an simple endpoint `GET /hello-world`;
- the definition of the Reply Fastify decorators for the error management;
- the definition of the Request Fastify decorators to enrich the request object.

Wonderful! You are now ready to start customizing your service! Read next section to learn how.

### Folder structure
The folder structure should follow this pattern:

    .
    ├── docs                    # Documentation files
    ├── scripts                 # Scripts for `npm run` automations
    ├── src                     # Source files
    │   ├── decorators          # Fastify decorators
    │   ├── endpoints           # Fastify endpoints (definition, handlers and validation schemas)
    │   ├── schemas             # Fastify schemas (e.g. environment variables schema)
    |   └── lib                 # Library folder
    ├── index.js                # Index file
    ├── LICENSE
    └── README.md

The `lib` folder should contain the code that is shared between the single endpoint implementations.
The `decorators` folder should contain the decorators of `request` and `reply` objects.
Moreover, the endpoint folder should follow this pattern:

    ...
    ├── endpoints                    
    │   ├── route-name          
    │   |   ├── get           
    │   |   |    ├── __tests__
    |   |   |    ├── index.js
    |   |   |    ├── handler.js
    |   |   |    └── schema.js
    |   |   ├── post           
    │   |   |    ├── __tests__
    |   |   |    ├── index.js
    |   |   |    ├── handler.js
    |   |   |    └── schema.js 
    |   |   └── ... 
    |   └── ...                
    └── ...

The `index.js` file should contain the definition of an endpoint, following the [Fastify plugin](https://www.fastify.io/docs/latest/Reference/Plugins/) registration pattern. This file should also contains the [hook implementation](https://www.fastify.io/docs/latest/Reference/Hooks/) which are related to the specific endpoint.

For further information, please refer to the `hello-world` example in the template and to the script for the endpoint creation. 

### GitOps

Usually, to start creating new features on a microservice, you need to create a branch. Due to the native support of this template to the SaMD development, the branch name should follow a specific convention, that is need to enhance traceability. The traceability is required by the IEC 62304 regulation for the SaMD development. The tool used for the branch naming check is [Husky](https://typicode.github.io/husky/).

By default, the pattern for the branch naming convention is: `<type>-<implementation-task-id>-<description>`. Example: `feat-MC-1-login-endpoint`.
- The `<type>` part is related to the type of the implementation. The possible options are: feat, fix and doc;
- The `<implementation-task-id>` is the identifier of the implementation task. Usually, it is the Jira story code;
- The `<description>` is the description of the story. It should be a short recap of the story.

Moreover, for the same traceability requirement, also the commit messages should follow a specific convention, that is the following: `[<implementation-task-id>] <commit-description>`. Example: `[MC-1] Added login endpoint`.
- The `<implementation-task-id>` is the identifier of the implementation task. Usually, it is the Jira story code;
- The `<commit-description>` is the description of the commit.

If the branch has been named correctly, the implementation task identifier is inserted automatically in the commit message. Therefore, when you run the command `git commit -m "message"`, the commit message is automatically created as `[<implementation-task-id>] message`. The automatic insertion of the implementation task identifier is performed by [jira-prepare-commit-msg](https://github.com/bk201-/jira-prepare-commit-msg).

You can customize the branch naming convention by modifying the bash script that checks the branch name. In particular, you need to modify the regex in the `./scripts/check-branch-naming.sh` with your convention. You can also disable the check by removing the run of the `check-branch-naming.sh` bash script directly in the `./.husky/pre-commit` file.

Moreover, you can remove the automatic insertion of the implementation task identifier by removing the run of the `npx jira-prepare-commit-msg` command directly in the `./.husky/prepare-commit-msg` file.

### Creating new endpoint

To create a new endpoint, following the Mia-Care guideline, you can use the following command:

```shell
npm run new-endpoint METHOD ENDPOINT ENDPOINT_NAME_METHOD
```

Note that, the `ENDPOINT_NAME_METHOD` will be used as method name to identify the endpoint in the `index.js` file.

For example, let's assume you want create the `GET /hello-world` endpoint. You will need to run:

 ```shell
npm run new-endpoint GET /hello-world getHelloWorld
```

This command creates the standard folder structure used by Mia-Care to define an endpoint for Fastify.
It creates: 
- the `handler.js` file, that contains the business logic of the endpoint;
- the `schema.js` file, that contains the definition of the endpoint schema;
- the `index.js` file, that contains the definition of the endpoint, as well as the decorators;
- the `handler.test.js` file, that contains the Jest unit tests for the handler.

### Decorators
The template includes a set of default of request and reply decorators. The [decorators API](https://www.fastify.io/docs/latest/Reference/Decorators/) allow customization of the core Fastify objects, such as the server instance itself and any request and reply objects used during the HTTP request lifecycle. The decorators can be modified and extended with domain-specific notation.

The template contains request and reply decorators for, respectively, enrichment of the request object with additional metadata (e.g. `requestId`) and error management. The template implements the formatter for the most common HTTP errors, allowing to have a common format for the error response that, by default, is the following:

```json
{
  "statusCode": "400",
  "error": "Bad Request",
  "message": "Custom error message",
  "requestId": "Request identifier"
}
```

The decorators can be accessed directly from the `request` and `reply` objects in the `handler.js` file.

*Example*
```js
async function handler(request, reply) {
  ...

  return reply.sendAuthorizationError(request, 'Custom error message')
}
```

## Expose an endpoint to your microservice

In order to access to your new microservice it is necessary to create an endpoint that targets it. Follow  [this link](../../development_suite/api-console/api-design/endpoints) to learn how to create an endpoint from the DevOps Console.

In particular, in this walkthrough you will create an endpoint to your _my-node-service-name_. To do so, from the Design area of your project select _Endpoints_ and then create a new endpoint.
Now you need to choose a path for your endpoint and to connect this endpoint to our microservice. Give to your endpoint the following path: **/greetings**. Then, specify that you want to connect your endpoint to a microservice and, finally, select _my-node-service-name_.

## Save again your changes

After having created an endpoint to your microservice you should **save** the changes that you have done to your project in the DevOps console, in a similar way to what you have previously done after the microservice creation.

## Deploy

Once all the changes that you have made are saved, you should deploy your project through the DevOps Console. Go to the **Deploy** area of the DevOps Console.  
Once here select the environment and the branch you have worked on and confirm your choices clicking on the _deploy_ button. When the deploy process is finished you will receive a pop-up message that will inform you.  
Follow [this link](../../development_suite/deploy/deploy) to learn how to correctly deploy your project.

## Try it

Now, if you launch the following command on your terminal (remember to replace `<YOUR_PROJECT_HOST>` with the real host of your project):  

```shell
curl <YOUR_PROJECT_HOST>/greetings/hello
```

you should see the following message:

```json
{"status":200,"message":"Hello World"}
```

Congratulations! You can now start developing your own NodeJS microservice!
