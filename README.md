## Nest Starter project

To use, clone this repo, remove the Git origin and start building. Included features:

- Auth0 token validation and extension of native Request object with user info
- Joi request validation pipe
- Permissions guard
- Base path support, for versioning or use behind an API gateway
- `launch.json` file for VS Code that allows you to hit F5 to debug and use breakpoints

### Environment & Configuration

Dotenv package is included so you can put a `.env` file in the root. Sample usage of `.env` is shown in the provided `sample.env` file. Available configuration options are:

- `AUTH_DOMAIN` - Configures the Auth0 domain for JWKS signing key lookup, e.g. foo.eu.auth0.com (note the https:// should NOT be included in this value)
- `AUTH_AUDIENCE` - Configures the Auth0 API audience which will be used when validating provided JWT tokens
- `AUTH_TOKEN_PROFILE_PROP` (*optional*) - If you've enriched your accessToken using an Auth0 pipeline rule, the app will look under this property for a user `name` and `email`. For example, if in your Auth0 rule you've specified a JSON key `accessToken['https://myclaims/userprofile']` that contains further user information, the middleware will check the token payload for a property called `'https://myclaims/userprofile` for `name` and `email` properties. These can be useful when logging actions on your API, as you don't need to perform a separate user lookup.
- `PORT` (*optional*) - Configure the port number the app listens on, which defaults to 3000 
- `BASE_PATH` (*optional*) - Use this to specify the base path for the app. This is useful for API gateway scenarios, or for specifying API versions without changing code. So you could set `v2` as the `BASE_PATH` and the app would listen on `http://{hostname}/v2` instead of the root

### Sample Module

Includes a sample module with:

- `sample.model.ts` - A dummy model with some fields and a Joi validation schema. Demonstrates conditional validation, when `status` is set to `Unavailable` then the field `back_order` becomes required
- `samples.controller.ts` - A sample controller with `get()` (GET /), `getById(id)` (GET /{id}) and `create(body)` (POST /) methods.
- `sample.service.ts` - A sample service with `find()`, `findById(id)` and `create(sampleObj)` methods

### Permissions Guard

Use the Permissions guard to inspects the user's `permissions[]` array for the presence of any specified permission. Can be attached to any endpoint using the `@Permissions(...permissions)` attribute. Example usage:

```typescript
@Delete(':id')
@Permissions('delete:samples')
@HttpCode(204)
async delete(@Param('id') id: string) {
    
}
```

### Joi Validation Pipe

Use the Joi validation pipe to apply Joi validation rules to an incoming request. Attach to an endpoint that supports a request body (such as Post or Put) using `@Body(new JoiValidationPipe(...validationSchema))`. Optionally, you can pass in a `JoiValidationOptions` object that specifies whether the pipe should strip out properties that are not present in the schema. Default value for `strip` is true. Example usage:

```typescript

// Validation schema
const validationSchema = Joi.object({
    foo:    Joi.string().required(),
    bar:    Joi.number(),
    baz:    Joi.boolean()
})

const validationOpts: JoiValidationOptions {
    strip: false
}

// Endpoint
@Post()
async create(@Body(new JoiValidationPipe(validationSchema, validationOpts))) {
    ...
}
```
