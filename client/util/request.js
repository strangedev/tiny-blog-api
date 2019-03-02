import * as Future from "fluture";
import * as R from "ramda";

function buildUrl(baseUrl, path, {query=null, auth=null}) {
    if (!R.isNil(auth)) {
        auth = null;  // auth not implemented yet
    }
    if (R.isNil(query)) {
        return path;
    }
    return encodeURI(
        R.reduce(
            (a, b) => a + b,
            `${baseUrl}${path}?`,
            R.intersperse(
                "&",
                R.map((key, value) => `${key}=${value}`)
            )
        )
    )
}

function callApi(baseUrl, path, method, {query=null, body=null, auth=null}) {
    return Future.Future((reject, resolve) => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        let url = buildUrl(baseUrl, path, {query, auth});

        fetch(url, {
            method,
            body: JSON.stringify(body),
            signal
        })
            .then(resolve)
            .catch(reject);

        return abortController.abort;
    }).chain(handleApiError);
}

function handleApiError(response) {
    if (!response.ok) {
        return Future.reject(`${response.status} ${response.statusText}`);
    }
    return Future.of(JSON.parse(response.body));
}

export {
    callApi,
    buildUrl
};