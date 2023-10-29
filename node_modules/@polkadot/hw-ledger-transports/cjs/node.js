"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transports = exports.packageInfo = void 0;
const tslib_1 = require("tslib");
const hw_transport_node_hid_singleton_1 = tslib_1.__importDefault(require("@ledgerhq/hw-transport-node-hid-singleton"));
const util_js_1 = require("./util.js");
var packageInfo_js_1 = require("./packageInfo.js");
Object.defineProperty(exports, "packageInfo", { enumerable: true, get: function () { return packageInfo_js_1.packageInfo; } });
exports.transports = (0, util_js_1.createDefs)(['hid', hw_transport_node_hid_singleton_1.default]);
