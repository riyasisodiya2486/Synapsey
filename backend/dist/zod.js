"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
exports.authValidation = zod_1.z.object({
    username: zod_1.z.string().min(3).max(10),
    password: zod_1.z.string().min(6).max(20)
});
