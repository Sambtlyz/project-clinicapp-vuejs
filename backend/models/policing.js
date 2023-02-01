const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const policing = sequelize.define(
    "policing", {
        policing_id_pri:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true, 
        },
        policingtype_id:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        policing_id:{
            type:Sequelize.STRING,
            allowNull:false,   
            get: function() {
                return "P000"+this.getDataValue('policing_id_pri').toString();
              }         
        },
        policing_name:{
            type:Sequelize.STRING,
            allowNull:false,            
        },
        policing_cost:{
            type: Sequelize.DECIMAL,
            decimalNumbers: true 
            
        }
    },{timestamps: false}
);


(async () => {
    await policing.sync({ force: false});
})();

module.exports = policing;