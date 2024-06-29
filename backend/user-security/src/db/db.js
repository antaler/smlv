import { Model, Sequelize, DataTypes } from 'sequelize'

const { DB_URI } = process.env

const sequelize = new Sequelize(DB_URI, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

})

export class User extends Model {

}

export class Health extends Model {

}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    last_otp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    invitations: {
      type: DataTypes.TINYINT,
      allowNull: true
    }

  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'user',
    createdAt: false,
    updatedAt: false,
    deletedAt: false
  }
)

Health.init({
  userId: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  weight: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  register_date: {
    type: DataTypes.DATE,
    primaryKey: true
  }
},
{
  sequelize,
  tableName: 'health',
  modelName: 'health',
  createdAt: false,
  updatedAt: false,
  deletedAt: false
})

User.hasMany(Health, {
  foreignKey: 'userId'
})
Health.belongsTo(User)
