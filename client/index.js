import * as Model from "tiny-blog-model"
import * as PublicV1alphaBlogEntry from "./PublicV1alpha/BlogEntry";
import * as PublicV1alphaTag from "./PublicV1alpha/Tag";

const PublicV1alpha = {
    model: {
        BlogEntry: Model.v1alpha.model.BlogEntry
    },
    client: (host, port, ssl=false) => ({
        BlogEntry: {
            view: {
                newest: PublicV1alphaBlogEntry.newest(host, port, ssl),
                byTag: PublicV1alphaBlogEntry.byTag(host, port, ssl)
            }
        },
        Tag: {
            view: {
                all: PublicV1alphaTag.all(host, port, ssl)
            }
        }
    })
};

export {
    PublicV1alpha
}