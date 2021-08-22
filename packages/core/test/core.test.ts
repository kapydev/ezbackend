import { describe, it, expect } from "@jest/globals";
import { EzBackend } from "../src/ezbackend";

describe("Default Behaviour", () => {
  it("expects the plugins to run in order", async () => {
    const arr = [];
    const ezb = EzBackend.app();
    ezb.plugins.preInit.push((ezb, opts, cb) => {
      arr.push(1);
      cb();
    });
    ezb.plugins.init = (ezb, opts, cb) => {
      arr.push(2);
      cb();
    };
    ezb.plugins.postInit.push((ezb, opts, cb) => {
      arr.push(3);
      cb();
    });
    ezb.plugins.postInit.push((ezb, opts, cb) => {
      arr.push(4);
      cb();
    });
    ezb.plugins.preHandler.push((ezb, opts, cb) => {
      arr.push(5);
      cb();
    });
    ezb.plugins.handler = (ezb, opts, cb) => {
      arr.push(6);
      cb();
    };
    ezb.plugins.postHandler.push((ezb, opts, cb) => {
      arr.push(7);
      cb();
    });
    ezb.plugins.preRun.push((ezb, opts, cb) => {
      arr.push(8);
      cb();
    });
    ezb.plugins.run = (ezb, opts, cb) => {
      arr.push(9);
      cb();
    };
    ezb.plugins.postRun.push((ezb, opts, cb) => {
      arr.push(10);
      cb();
    });
    await EzBackend.start();

    expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
