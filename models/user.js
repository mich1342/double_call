const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) =>{
    const user = sequelize.define("user", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }

    });
    
    return user
}