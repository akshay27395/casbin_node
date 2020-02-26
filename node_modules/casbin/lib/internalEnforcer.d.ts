import { CoreEnforcer } from './coreEnforcer';
/**
 * InternalEnforcer = CoreEnforcer + Internal API.
 */
export declare class InternalEnforcer extends CoreEnforcer {
    /**
     * addPolicyInternal adds a rule to the current policy.
     */
    addPolicyInternal(sec: string, ptype: string, rule: string[]): Promise<boolean>;
    /**
     * removePolicyInternal removes a rule from the current policy.
     */
    removePolicyInternal(sec: string, ptype: string, rule: string[]): Promise<boolean>;
    /**
     * removeFilteredPolicyInternal removes rules based on field filters from the current policy.
     */
    removeFilteredPolicyInternal(sec: string, ptype: string, fieldIndex: number, fieldValues: string[]): Promise<boolean>;
}
