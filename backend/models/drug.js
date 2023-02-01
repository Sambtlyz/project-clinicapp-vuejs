const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const drug = sequelize.define(
    "drug", {
        drug_id_pri:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true  
        },
        drug_id:{
            type:Sequelize.STRING,
            allowNull:false,
            get: function() {
                return "D000"+this.getDataValue('drug_id_pri').toString();
              }             
        },
        drugtype_id:{
            type:Sequelize.INTEGER,
            allowNull:false,            
        },
        drug_name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        drug_price:{
            type:Sequelize.DECIMAL(20,2),
            allowNull:false,
        },
        drug_unit:{
            type:Sequelize.STRING,

        },
        user_fullname:{
            type:Sequelize.STRING,
            
        },
        drug_total:{
            type:Sequelize.INTEGER,
            
        },
        drug_status_id:{
            type:Sequelize.INTEGER,
            defaultValue: 1,
        },
        drug_direction:{
            type:Sequelize.STRING,
        }
    },{timestamps: false}
);

//  drugtype = sequelize.define(
//     "drugtype", {
//         drugtype_id:{
//             type:Sequelize.INTEGER,
//             primaryKey:true,
//             autoIncrement: true  
//         },
//         drugtype_name:{
//             type:Sequelize.STRING,
//             allowNull:false, 
//         }
//     },{timestamps: false}
// );



// drug.belongsTo(drugtype);


(async () => {
    await drug.sync({ force: false});
})();

module.exports = drug;