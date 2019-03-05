# tiny-blog-api

Api spec and JS client for tiny-blog

[![npm](https://img.shields.io/npm/v/tiny-blog-api.svg)](https://www.npmjs.com/package/tiny-blog-api) [![codecov](https://codecov.io/gh/strangedev/tiny-blog-api/branch/master/graph/badge.svg)](https://codecov.io/gh/strangedev/tiny-blog-api)

### Related repos

 - tiny-blog: https://github.com/strangedev/tiny-blog 
 - tiny-blog-api: https://github.com/strangedev/tiny-blog-api
 - tiny-blog-backend: https://github.com/strangedev/tiny-blog-backend
 - tiny-blog-ui: https://github.com/strangedev/tiny-blog-ui
 - tiny-blog-model: https://github.com/strangedev/tiny-blog-model

### Usage

```javascript
import {Public} from "tiny-blog-api";

const backend = {
    host: "localhost",
    port: "3000",
    ssl: false
};
const client = Public.client(
    backend.host,
    backend.port,
    backend.ssl
);

let cancel = client.BlogEntry.view.newest().fork(
    console.error,
    console.log  // type [Public.model.BlogEntry]
);

cancel = client.Tag.view.all().fork(
    console.error,
    console.log  // type [String]
);
```
