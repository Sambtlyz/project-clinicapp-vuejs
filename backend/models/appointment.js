const Sequelize = require("sequelize");
const sequelize = require("./../db_instance");

const appointment = sequelize.define(
    "appointment", {
        appointment_id_pri: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id:{
            type: Sequelize.INTEGER,
        },
        customer_id_pri:{
            type: Sequelize.INTEGER,
        },
        topic: {
            type: Sequelize.STRING,
        },
        appointment_date:{
            type: Sequelize.STRING,
        },
        tel:{
            type: Sequelize.STRING,
        },
        note:{
            type: Sequelize.STRING,
        },
        appointment_status:{
            type: Sequelize.INTEGER,
        },
        start:{
            type:Sequelize.STRING
         },
         end:{
            type:Sequelize.STRING
         },
        
    },{timestamps: false}
);


(async () => {
    await appointment.sync({ force: false});
})();

module.exports = appointment;