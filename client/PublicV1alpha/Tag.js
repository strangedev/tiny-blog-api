import {callApi} from "../util/request";

function all(host, port, ssl=false){
    return (tags, offset, limit) => {
        return callApi(host, "/Tag/", "GET", {
            query: {offset, limit},
            body: tags,
            port,
            ssl
        })
    };
}

export {
    all
};