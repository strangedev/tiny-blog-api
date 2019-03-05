import 'babel-polyfill';
import {callApi} from "../util/request";
import {all} from "./Tag";
import * as Future from "fluture";

jest.mock("../util/request");

beforeAll(() => {
    // create some tags
    global.tags = ["foo", "bar", "spam"];
    // mock callApi to always return global.tags
    callApi.mockReturnValue(Future.of(global.tags));
    // create API
    global.port = 1337;
    global.host = "lokalhorst";
    global.allFn = all(global.host, global.port);
});

test("BlogEntry.newest", () => {
    let future = global.allFn().chain(
        tags => {
            expect(callApi).toHaveBeenCalledWith(
                global.host,
                "/Tag/",
                "GET",
                {
                    port: global.port,
                    ssl: false
                }
            );
            return Future.of(tags)
        }
    );
    return expect(future.promise()).resolves.toEqual(global.tags);
});