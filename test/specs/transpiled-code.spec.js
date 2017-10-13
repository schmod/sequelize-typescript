"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var fs_1 = require("fs");
var chaiAsPromised = require("chai-as-promised");
var common_1 = require("../utils/common");
chai_1.use(chaiAsPromised);
describe('transpiled code', function () {
    var es6FileSubPaths = [
        'v4/Model.js',
        'v4/Sequelize.js',
    ];
    (function run(path) {
        fs_1.readdirSync(path)
            .forEach(function (name) {
            var targetPath = path + '/' + name;
            if (fs_1.statSync(targetPath).isDirectory()) {
                run(targetPath);
            }
            else if (name.slice(-3) === '.js') {
                var parentDir = path.split('/').pop();
                var target = parentDir + '/' + name;
                var isEs6_1 = es6FileSubPaths.indexOf(target) !== -1;
                describe(target, function () {
                    it("should " + (isEs6_1 ? '' : 'NOT ') + "contain es6 syntax", function () {
                        var content = fs_1.readFileSync(targetPath).toString();
                        try {
                            chai_1.expect(common_1.containsEs6Syntax(content)).to.be[isEs6_1.toString()];
                        }
                        catch (e) {
                            e.message = e.message + '\n\n\nAffected content:\n\n' + content + '\n\n\n';
                            throw e;
                        }
                    });
                });
            }
        });
    })(__dirname + '/../../lib');
});
//# sourceMappingURL=transpiled-code.spec.js.map