import {callApi} from "../util/request";
import {v1alpha} from "tiny-blog-model";

const baseUrl = "localhost:3000";

function getBlogEntriesByTag(tags, offset, limit) {
    return callApi(baseUrl, "/entries/byTag", "GET", {
        query: {offset, limit},
        body: tags
    })
        .map(v1alpha.model.BlogEntry.unMarshal);
}

function getBlogEntriesByNewest(offset, limit) {
    return callApi(baseUrl, "/entries/newest", "GET", {
        query: {offset, limit}
    })
        .map(v1alpha.model.BlogEntry.unMarshal);
}

export {
    getBlogEntriesByNewest,
    getBlogEntriesByTag
};