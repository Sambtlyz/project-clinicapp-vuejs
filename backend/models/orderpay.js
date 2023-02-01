const Sequelize = require("sequelize");
const sequelize = require(".././db_instance");

const orderpay = sequelize.define(
    "orderpay", {
        orderpay_id_pri:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true, 
        },
        customer_id_pri:{
            type:Sequelize.INTEGER,
        },
        drug_id_pri:{
            type:Sequelize.INTEGER,
        },
        policing_id_pri:{
            type:Sequelize.INTEGER,
        },
        orderpay_id:{
            type:Sequelize.STRING,
        },
        drug_name:{
            type:Sequelize.STRING
        },
        policing_name:{
            type:Sequelize.STRING
        },
        drug_price_total:{
            type:Sequelize.DECIMAL,
        },
        policing_price_total:{
            type:Sequelize.DECIMAL,
        },
        orderpay_total:{
            type:Sequelize.DECIMAL,
        },
        orderpay_date:{
            type:Sequelize.STRING,
        }
    },{timestamps: false}
);

(async () => {
    await orderpay.sync({ force: false});
})();

module.exports = orderpay;