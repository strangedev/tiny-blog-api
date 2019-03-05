# tiny-blog-api

Api spec and JS client for tiny-blog

[![npm](https://img.shields.io/npm/v/tiny-blog-api.svg)](https://www.npmjs.com/package/tiny-blog-api)

### Related repos

 - tiny-blog: https://github.com/strangedev/tiny-blog 
 - tiny-blog-api: https://github.com/strangedev/tiny-blog-api
 - tiny-blog-backend: https://github.com/strangedev/tiny-blog-backend
 - tiny-blog-ui: https://github.com/strangedev/tiny-blog-ui
 - tiny-blog-model: https://github.com/strangedev/tiny-blog-model

### Usage

```javascript
import {PublicV1alpha} from "tiny-blog-api";

const backend = {
    host: "localhost",
    port: "3000",
    ssl: false
};
const client = PublicV1alpha.client(
    backend.host,
    backend.port,
    backend.ssl
);

let cancel = client.BlogEntry.view.newest().fork(
    console.error,
    console.log  // type [PublicV1Alpha.model.BlogEntry]
);

cancel = client.Tag.view.all().fork(
    console.error,
    console.log  // type [String]
);
```
