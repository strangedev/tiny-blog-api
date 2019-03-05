import 'babel-polyfill';
import {buildUrl} from "./request";

test("request.buildUrl http with no query", () => {
    let url = buildUrl("localhost", "/things", {});
    expect(url.toString()).toEqual("http://localhost/things");
});

test("request.buildUrl https with no query", () => {
    let url = buildUrl("localhost", "/things", {ssl: true});
    expect(url.toString()).toEqual("https://localhost/things");
});

test("request.buildUrl https on alternate port with no query", () => {
    let url = buildUrl("localhost", "/things", {ssl: true, port: 8443});
    expect(url.toString()).toEqual("https://localhost:8443/things");
});

test("request.buildUrl http on alternate port with no query", () => {
    let url = buildUrl("localhost", "/things", {ssl: true, port: 8080});
    expect(url.toString()).toEqual("https://localhost:8080/things");
});

test("request.buildUrl https with port 80 becomes port 443", () => {
    let url = buildUrl("localhost", "/things", {ssl: true, port: 80});
    expect(url.toString()).toEqual("https://localhost/things");
});


test("request.buildUrl http with query", () => {
    let query = {
        foo: "bar",
        stuff: 3
    };
    let url = buildUrl("localhost", "/things", {query});
    expect(url.toString()).toEqual("http://localhost/things?foo=bar&stuff=3");
});

test("request.buildUrl http with query containing special characters", () => {
    let query = {
        foo: "µä﷽🏳0🌈️"
    };
    let url = buildUrl("localhost", "/things", {query});
    expect(url.toString()).toEqual("http://localhost/things?foo=%C2%B5%C3%A4%EF%B7%BD%F0%9F%8F%B30%F0%9F%8C%88%EF%B8%8F");
});