module.exports = (sequelize, DataTypes) =>{
    const favourite_movie = sequelize.define("favourite_movie", {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
    return favourite_movie
}