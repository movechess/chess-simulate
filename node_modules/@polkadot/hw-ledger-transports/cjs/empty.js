"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transports = exports.packageInfo = void 0;
const util_js_1 = require("./util.js");
var packageInfo_js_1 = require("./packageInfo.js");
Object.defineProperty(exports, "packageInfo", { enumerable: true, get: function () { return packageInfo_js_1.packageInfo; } });
exports.transports = (0, util_js_1.createDefs)();
