import { Effect, Effector } from './effector';
/**
 * DefaultEffector is default effector for Casbin.
 */
export declare class DefaultEffector implements Effector {
    /**
     * mergeEffects merges all matching results collected by the enforcer into a single decision.
     * @param {string} expr
     * @param {Effect[]} effects
     * @param {number[]} results
     * @returns {boolean}
     */
    mergeEffects(expr: string, effects: Effect[], results: number[]): boolean;
}
