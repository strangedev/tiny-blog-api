import * as Model from "tiny-blog-model"
import * as PublicBlogEntry from "./client/Public/BlogEntry";
import * as PublicTag from "./client/Public/Tag";

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