export declare enum Effect {
    Allow = 1,
    Indeterminate = 2,
    Deny = 3
}
export interface Effector {
    mergeEffects(expr: string, effects: Effect[], results: number[]): boolean;
}
