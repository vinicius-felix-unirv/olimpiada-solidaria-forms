"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.DatabaseConfig = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConfig {
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'healthcare_survey',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
        this.pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }
    static getInstance() {
        if (!DatabaseConfig.instance) {
            DatabaseConfig.instance = new DatabaseConfig();
        }
        return DatabaseConfig.instance;
    }
    getPool() {
        return this.pool;
    }
    async connect() {
        try {
            const client = await this.pool.connect();
            console.log('Database connected successfully');
            client.release();
        }
        catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.pool.end();
            console.log('Database disconnected successfully');
        }
        catch (error) {
            console.error('Error disconnecting from database:', error);
            throw error;
        }
    }
}
exports.DatabaseConfig = DatabaseConfig;
exports.db = DatabaseConfig.getInstance();
//# sourceMappingURL=database.js.map