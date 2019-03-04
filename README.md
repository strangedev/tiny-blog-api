# tiny-blog-api
Api spec and JS client for tiny-blog

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

cancel = PublicV1alpha.client(
    backend.host,
    backend.port,
    backend.ssl
).Tag.view.all().fork(
    console.error,
    console.log  // type [String]
);
```
