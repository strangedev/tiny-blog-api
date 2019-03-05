import * as Model from "tiny-blog-model"
import * as PublicBlogEntry from "./client/PublicV1alpha/BlogEntry";
import * as PublicTag from "./client/PublicV1alpha/Tag";

const Public = {
    model: {
        BlogEntry: Model.BlogEntry
    },
    client: (host, port, ssl=false) => ({
        BlogEntry: {
            view: {
                newest: PublicBlogEntry.newest(host, port, ssl),
                byTag: PublicBlogEntry.byTag(host, port, ssl)
            }
        },
        Tag: {
            view: {
                all: PublicTag.all(host, port, ssl)
            }
        }
    })
};

export {
    Public
}