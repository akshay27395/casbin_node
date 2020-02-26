import { Adapter } from './adapter';
import { Model } from '../model';
/**
 * FileAdapter is the file adapter for Casbin.
 * It can load policy from file or save policy to file.
 */
export declare class FileAdapter implements Adapter {
    readonly filePath: string;
    /**
     * FileAdapter is the constructor for FileAdapter.
     * @param {string} filePath filePath the path of the policy file.
     */
    constructor(filePath: string);
    loadPolicy(model: Model): Promise<void>;
    private loadPolicyFile;
    /**
     * savePolicy saves all policy rules to the storage.
     */
    savePolicy(model: Model): Promise<boolean>;
    private savePolicyFile;
    /**
     * addPolicy adds a policy rule to the storage.
     */
    addPolicy(sec: string, ptype: string, rule: string[]): Promise<void>;
    /**
     * removePolicy removes a policy rule from the storage.
     */
    removePolicy(sec: string, ptype: string, rule: string[]): Promise<void>;
    /**
     * removeFilteredPolicy removes policy rules that match the filter from the storage.
     */
    removeFilteredPolicy(sec: string, ptype: string, fieldIndex: number, ...fieldValues: string[]): Promise<void>;
}
