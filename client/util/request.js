import * as Future from "fluture";
import * as R from "ramda";
import fetch from "cross-fetch";

function buildUrl(host, path, {ssl=false, port=80, query=null, auth=null}) {
    if (!R.isNil(auth)) {
        auth = null;  // auth not implemented yet
    }
    let proto = "http://";
    if (ssl) {
        proto = "https://";
        if (port === 80) {
            port = 443;
        }
    }
    let url = new URL(`${proto}${host}:${port}${path}`);
    if (!R.isNil(query)) {
        Object.keys(query).forEach(
            key => url.searchParams.append(key, query[key])
        )
    }
    return url;
}

function callApi(host, path, method, {ssl=false, port=80, query=null, body=null, auth=null}) {
    let url = buildUrl(host, path, {ssl, port, query, auth});

    let options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
    };
    if (!R.isNil(body)) {
        options.body = JSON.stringify(body);
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
    buildUrl,
    handleApiError
};