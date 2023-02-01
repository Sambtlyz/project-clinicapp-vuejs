const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const room = sequelize.define(
    "room", {
        room_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true  
        },
        room_name:{
            type:Sequelize.STRING,
        }
    },{timestamps: false}
);

(async () => {
    await room.sync({ force: false});
})();

module.exports  = room; 