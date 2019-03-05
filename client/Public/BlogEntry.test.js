import 'babel-polyfill';
import {callApi} from "../util/request";
import {byTag, newest} from "./BlogEntry";
import * as Future from "fluture";
import {BlogEntry} from "tiny-blog-model";

jest.mock("../util/request");

beforeAll(() => {
    // create some tags
    global.tags = ["foo", "bar", "spam"];
    // create a BlogEntry
    global.aBlogEntry = new BlogEntry(
        "some-id",
        "some-title",
        "some-content",
        "some-author",
        Date.now(),
        global.tags
    );
    // mock callApi to always return global.aBlogEntry as dict
    callApi.mockReturnValue(Future.of([
        global.aBlogEntry.marshal()
    ]));
    // create API
    global.port = 1337;
    global.host = "lokalhorst";
    global.newestFn = newest(global.host, global.port);
    global.byTagFn = byTag(global.host, global.port);
});

test("BlogEntry.newest", () => {
    let limit = 0;
    let offset = 50;
    let future = global.newestFn(offset, limit).chain(
        newest => {
            expect(callApi).toHaveBeenCalledWith(
                global.host,
                "/BlogEntry/newest",
                "GET",
                {
                    query: {
                        offset,
                        limit
                    },
                    port: global.port,
                    ssl: false
                }
            );
            return Future.of(newest)
        }
    );
    return expect(future.promise()).resolves.toEqual([global.aBlogEntry]);
});

test("BlogEntry.byTag", () => {
    let limit = 0;
    let offset = 50;
    let future = global.byTagFn(global.tags, offset, limit).chain(
        newest => {
            expect(callApi).toHaveBeenCalledWith(
                global.host,
                "/BlogEntry/byTag",
                "GET",
                {
                    query: {
                        offset,
                        limit
                    },
                    body: {
                        tags: global.tags
                    },
                    port: global.port,
                    ssl: false
                }
            );
            return Future.of(newest)
        }
    );
    return expect(future.promise()).resolves.toEqual([global.aBlogEntry]);
});