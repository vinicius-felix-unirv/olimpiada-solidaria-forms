import { Model, Optional } from 'sequelize';
interface UserAttributes {
    id: number;
    nome: string;
    email: string;
    senha: string;
    crm?: string;
    instituicao?: string;
    telefone?: string;
    especialidade?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'crm' | 'instituicao' | 'telefone' | 'especialidade' | 'createdAt' | 'updatedAt'> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    nome: string;
    email: string;
    senha: string;
    crm?: string;
    instituicao?: string;
    telefone?: string;
    especialidade?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default User;
export { UserAttributes, UserCreationAttributes };
