const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const qpolicing = sequelize.define(
    "qpolicing", {
        qpolicing_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true  ,
            // get: function() {
            //     return "CN"+this.getDataValue('qpolicing_id').toString();
            //   }
        },
        customer_id_pri:{
            type:Sequelize.INTEGER,
        },
        opd_code:{
            type:Sequelize.STRING,
            get: function() {
                return "CN00"+this.getDataValue('qpolicing_id').toString();
              }
            
        },
        opd_date:{
            type:Sequelize.STRING,
        },
        room_name:{
            type:Sequelize.STRING,
        },
        room_id:{
            type:Sequelize.INTEGER,
        },
        customer_fullname:{
            type:Sequelize.STRING,
        },
        user_fullname:{
            type:Sequelize.STRING,
        },
        qpolicing_status:{
            type:Sequelize.STRING,
            defaultValue: 0,
        }
       
    },{timestamps: false}
);



(async () => {
    await qpolicing.sync({ force: false});
})();

module.exports  = qpolicing; 