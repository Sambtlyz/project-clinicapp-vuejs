const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const drugtype = sequelize.define(
    "drugtype", {
        drugtype_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true  
        },
        drugtype_name:{
            type:Sequelize.STRING,
            allowNull:false, 
        }
    },{timestamps: false}
);


(async () => {
    await drugtype.sync({ force: false});
})();

module.exports  = drugtype;