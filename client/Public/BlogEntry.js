import {callApi} from "../util/request";
import {BlogEntry} from "tiny-blog-model";
import * as R from "ramda";

function byTag(host, port, ssl=false){
    return (tags, offset, limit) =>
        callApi(host, "/BlogEntry/byTag", "GET", {
            query: {offset, limit},
            body: {
                tags
            },
            port,
            ssl
        }).map(
            entries => R.map(
                BlogEntry.unMarshal,
                entries
            )
        );
}

function newest(host, port, ssl=false){
    return (offset, limit) => {
        return callApi(host, "/BlogEntry/newest", "GET", {
            query: {offset, limit},
            port,
            ssl
        }).map(
                entries => R.map(
                    BlogEntry.unMarshal,
                    entries
                )
            );
    }
}

export {
    byTag,
    newest
};