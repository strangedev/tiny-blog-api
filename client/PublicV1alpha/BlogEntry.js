import {callApi} from "../util/request";
import BlogEntry from "../../tiny-blog-model/v1alpha/BlogEntry";

const baseUrl = "localhost:8082";

function getBlogEntriesByTag(tags, offset, limit) {
    return callApi(baseUrl, "/entries/byTag", "GET", {
        query: {offset, limit},
        body: tags
    })
        .map(BlogEntry.unMarshal);
}

function getBlogEntriesByNewest(offset, limit) {
    return callApi(baseUrl, "/entries/newest", "GET", {
        query: {offset, limit}
    })
        .map(BlogEntry.unMarshal);
}

export {
    getBlogEntriesByNewest,
    getBlogEntriesByTag
};