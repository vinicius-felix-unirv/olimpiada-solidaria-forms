import { Pool } from 'pg';
export declare class DatabaseConfig {
    private static instance;
    private readonly pool;
    private constructor();
    static getInstance(): DatabaseConfig;
    getPool(): Pool;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
export declare const db: DatabaseConfig;
//# sourceMappingURL=database.d.ts.map