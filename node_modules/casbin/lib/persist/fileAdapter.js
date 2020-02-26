"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./helper");
const util_1 = require("../util");
/**
 * FileAdapter is the file adapter for Casbin.
 * It can load policy from file or save policy to file.
 */
class FileAdapter {
    /**
     * FileAdapter is the constructor for FileAdapter.
     * @param {string} filePath filePath the path of the policy file.
     */
    constructor(filePath) {
        this.filePath = filePath;
    }
    loadPolicy(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.filePath) {
                // throw new Error('invalid file path, file path cannot be empty');
                return;
            }
            yield this.loadPolicyFile(model, helper_1.Helper.loadPolicyLine);
        });
    }
    loadPolicyFile(model, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyBuf = yield util_1.readFile(this.filePath);
            const lines = bodyBuf.toString().split('\n');
            lines.forEach((n, index) => {
                const line = n.trim();
                if (!line) {
                    return;
                }
                handler(n, model);
            });
        });
    }
    /**
     * savePolicy saves all policy rules to the storage.
     */
    savePolicy(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.filePath) {
                // throw new Error('invalid file path, file path cannot be empty');
                return false;
            }
            let result = '';
            const pList = model.model.get('p');
            if (!pList) {
                return false;
            }
            pList.forEach(n => {
                n.policy.forEach(m => {
                    result += n.key + ', ';
                    result += util_1.arrayToString(m);
                    result += '\n';
                });
            });
            const gList = model.model.get('g');
            if (!gList) {
                return false;
            }
            gList.forEach(n => {
                n.policy.forEach(m => {
                    result += n.key + ', ';
                    result += util_1.arrayToString(m);
                    result += '\n';
                });
            });
            yield this.savePolicyFile(result.trim());
            return true;
        });
    }
    savePolicyFile(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield util_1.writeFile(this.filePath, text);
        });
    }
    /**
     * addPolicy adds a policy rule to the storage.
     */
    addPolicy(sec, ptype, rule) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
    /**
     * removePolicy removes a policy rule from the storage.
     */
    removePolicy(sec, ptype, rule) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
    /**
     * removeFilteredPolicy removes policy rules that match the filter from the storage.
     */
    removeFilteredPolicy(sec, ptype, fieldIndex, ...fieldValues) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.FileAdapter = FileAdapter;
