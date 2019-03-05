import {callApi} from "../util/request";

function all(host, port, ssl=false){
    return () => {
        return callApi(host, "/Tag/", "GET", {
            port,
            ssl
        })
    };
}

export {
    all
};