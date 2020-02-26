export interface RoleManager {
    clear(): Promise<void>;
    addLink(name1: string, name2: string, ...domain: string[]): Promise<void>;
    deleteLink(name1: string, name2: string, ...domain: string[]): Promise<void>;
    hasLink(name1: string, name2: string, ...domain: string[]): Promise<boolean>;
    getRoles(name: string, ...domain: string[]): Promise<string[]>;
    getUsers(name: string, ...domain: string[]): Promise<string[]>;
    printRoles(): Promise<void>;
}
