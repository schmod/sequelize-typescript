"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize_1 = require("../../lib/models/Sequelize");
var OriginSequelize = require("sequelize");
function createSequelize(useModelsInPathOrPartialOptions, define) {
    if (define === void 0) { define = {}; }
    var useModelsInPath = true;
    var partialOptions = {};
    if (typeof useModelsInPathOrPartialOptions === 'object') {
        partialOptions = useModelsInPathOrPartialOptions;
    }
    else if (typeof useModelsInPathOrPartialOptions === 'boolean') {
        useModelsInPath = useModelsInPathOrPartialOptions;
    }
    return new Sequelize_1.Sequelize(__assign({ database: '__', dialect: 'sqlite', username: 'root', password: '', define: define, storage: ':memory:', logging: !('SEQ_SILENT' in process.env), modelPaths: useModelsInPath ? [__dirname + '/../models'] : [] }, partialOptions));
}
exports.createSequelize = createSequelize;
function createSequelizeValidationOnly(useModelsInPath) {
    if (useModelsInPath === void 0) { useModelsInPath = true; }
    return new Sequelize_1.Sequelize({
        validateOnly: true,
        logging: !('SEQ_SILENT' in process.env),
        modelPaths: useModelsInPath ? [__dirname + '/../models'] : []
    });
}
exports.createSequelizeValidationOnly = createSequelizeValidationOnly;
function createOriginSequelize() {
    return new OriginSequelize('___', 'root', '', {
        dialect: 'sqlite',
        storage: ':memory:',
        logging: !('SEQ_SILENT' in process.env)
    });
}
exports.createOriginSequelize = createOriginSequelize;
//# sourceMappingURL=sequelize.js.map