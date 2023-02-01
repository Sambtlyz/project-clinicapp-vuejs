const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const user = sequelize.define(
    "user", {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            
        },
        tel:{
            type: Sequelize.STRING,
        },
        role_id:{
            type: Sequelize.INTEGER
        }
        
    },{ }
);


(async () => {
    await user.sync({ force: false});
})();

module.exports = user;