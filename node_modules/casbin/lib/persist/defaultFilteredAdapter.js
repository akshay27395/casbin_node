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
const fileAdapter_1 = require("./fileAdapter");
const helper_1 = require("./helper");
const util_1 = require("../util");
class Filter {
    constructor() {
        this.g = [];
        this.p = [];
    }
}
exports.Filter = Filter;
class DefaultFilteredAdapter extends fileAdapter_1.FileAdapter {
    constructor(filePath) {
        super(filePath);
        this.filtered = false;
    }
    // loadPolicy loads all policy rules from the storage.
    loadPolicy(model) {
        const _super = Object.create(null, {
            loadPolicy: { get: () => super.loadPolicy }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.filtered = false;
            yield _super.loadPolicy.call(this, model);
        });
    }
    loadFilteredPolicy(model, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filter) {
                yield this.loadPolicy(model);
                return;
            }
            if (!this.filePath) {
                throw new Error('invalid file path, file path cannot be empty');
            }
            yield this.loadFilteredPolicyFile(model, filter, helper_1.Helper.loadPolicyLine);
            this.filtered = true;
        });
    }
    loadFilteredPolicyFile(model, filter, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            const bodyBuf = yield util_1.readFile(this.filePath);
            const lines = bodyBuf.toString().split('\n');
            lines.forEach((n, index) => {
                const line = n.trim();
                if (!line || DefaultFilteredAdapter.filterLine(line, filter)) {
                    return;
                }
                handler(line, model);
            });
        });
    }
    isFiltered() {
        return this.filtered;
    }
    savePolicy(model) {
        const _super = Object.create(null, {
            savePolicy: { get: () => super.savePolicy }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.filtered) {
                throw new Error('cannot save a filtered policy');
            }
            yield _super.savePolicy.call(this, model);
            return true;
        });
    }
    static filterLine(line, filter) {
        if (!filter) {
            return false;
        }
        const p = line.split(',');
        if (p.length === 0) {
            return true;
        }
        let filterSlice = [];
        switch (p[0].trim()) {
            case 'p':
                filterSlice = filter.p;
                break;
            case 'g':
                filterSlice = filter.g;
                break;
        }
        return DefaultFilteredAdapter.filterWords(p, filterSlice);
    }
    static filterWords(line, filter) {
        if (line.length < filter.length + 1) {
            return true;
        }
        let skipLine = false;
        for (let i = 0; i < filter.length; i++) {
            if (filter[i] && filter[i].trim() !== filter[i + 1].trim()) {
                skipLine = true;
                break;
            }
        }
        return skipLine;
    }
}
exports.DefaultFilteredAdapter = DefaultFilteredAdapter;
