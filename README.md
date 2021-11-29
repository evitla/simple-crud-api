# Simple CRUD API

This is simple CRUD API that uses in-memory database underneath.

### Install

```sh
npm install
```

To run the application on port, you can create `.env` file in root with following key:

```sh
PORT=<port number>
```

### Application can run in two modes: development and production

To run in development mode:
```sh
npm run start:dev
```

To run in production mode:
```sh
npm run start:prod
```

### To run tests

```sh
npm test
```

### Available `endpoints` to call
- `api/person` - to GET all available persons list
- `api/person` - to POST to create person
- `api/person/${id}` - to GET person with `id`
- `api/person/${id}` - to DELETE person with `id`
- `api/person/${id}` - to PUT to update person with `id`  

