import * as Future from "fluture";
import * as R from "ramda";
import * as fetch from "@brillout/fetch";

function buildUrl(host, path, {ssl=false, port=80, query=null, auth=null}) {
    if (!R.isNil(auth)) {
        auth = null;  // auth not implemented yet
    }
    if (R.isNil(query)) {
        return path;
    }
    let proto = "http://";
    if (ssl) {
        proto = "https://";
        if (port === 80) {
            port = 443;
        }
    }
    let url = `${proto}${host}:${port}${path}`;
    return encodeURI(
        R.reduce(
            (a, b) => a + b,
            `${url}?`,
            R.intersperse(
                "&",
                R.map((key, value) => `${key}=${value}`)
            )
        )
    )
}

function callApi(host, path, method, {ssl=false, port=80, query=null, body=null, auth=null}) {
    let url = buildUrl(host, path, {ssl, port, query, auth});

    let options = {
        method
    };
    if (!R.isNil(body)) {
        options.body = body;
    }

    return Future.tryP(() => fetch(url, options)).chain(handleApiError);
}

function handleApiError(response) {
    if (!response.ok) {
        return Future.reject(`${response.status} ${response.statusText}`);
    }
    return Future.tryP(() => response.json());
}

export {
    callApi,
    buildUrl
};