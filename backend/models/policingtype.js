const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const policingtype = sequelize.define(
    "policingtype", {
        policingtype_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true  
        },
        policingtype_name:{
            type:Sequelize.STRING,
            allowNull:false, 
        }
    },{timestamps: false}
);


(async () => {
    await policingtype.sync({ force: false});
})();

module.exports  = policingtype;