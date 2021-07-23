import Sequelize from 'sequelize';
import {db} from '../config/db';

export interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
};

export const userModel = db.define('users',{
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey : true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email:  Sequelize.STRING,
  phone:  Sequelize.STRING,
  dateOfBirth: {
    type: Sequelize.DATE,
    field: 'dateofbirth'
  }
});


export const userRole = db.define('user_roles',{
  roles: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    primaryKey : true,
    field: 'roleid',
  },
  userid: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey : true,
    references:{
      model: userModel,
      key: 'id'
    },
  }
});

userRole.belongsTo(userModel, {foreignKey: 'id'} );
userModel.hasMany(userRole , {foreignKey : 'userid'} );
