const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const role = sequelize.define(
    "role" ,{
        role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: Sequelize.STRING
        }
    },{timestamps: false}
);


(async () => {
    await role.sync({ force: false});
})();

module.exports = role;