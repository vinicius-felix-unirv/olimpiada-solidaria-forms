import { Sequelize } from 'sequelize';
declare const sequelize: Sequelize;
export default sequelize;
export declare const testConnection: () => Promise<void>;
export declare const syncDatabase: () => Promise<void>;
