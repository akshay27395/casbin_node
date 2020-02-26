export declare class FunctionMap {
    private functions;
    /**
     * constructor is the constructor for FunctionMap.
     */
    constructor();
    static loadFunctionMap(): FunctionMap;
    addFunction(name: string, func: any): void;
    getFunctions(): any;
}
