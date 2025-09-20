// src/models/User.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Interface para os atributos do usuário
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

// Interface para criação do usuário (campos opcionais na criação)
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Classe do modelo User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public crm?: string;
  public instituicao?: string;
  public telefone?: string;
  public especialidade?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Método estático para buscar usuário por email
  static async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  // Método estático para verificar se email já existe
  static async emailExists(email: string): Promise<boolean> {
    const user = await User.findByEmail(email);
    return user !== null;
  }
}

// Definição do modelo no Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Nome é obrigatório',
        },
        len: {
          args: [3, 100],
          msg: 'Nome deve ter entre 3 e 100 caracteres',
        },
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: {
        name: 'unique_email',
        msg: 'Este email já está cadastrado',
      },
      validate: {
        notEmpty: {
          msg: 'Email é obrigatório',
        },
        isEmail: {
          msg: 'Formato de email inválido',
        },
      },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Senha é obrigatória',
        },
        len: {
          args: [6, 255],
          msg: 'Senha deve ter pelo menos 6 caracteres',
        },
      },
    },
    crm: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    instituicao: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    especialidade: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  }
);

export default User;
export { UserAttributes, UserCreationAttributes };
