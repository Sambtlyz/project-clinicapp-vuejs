const Sequelize = require("sequelize");
const sequelize = require(".././db_instance");


const order = sequelize.define(
    "order", {
        order_id_pri:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true, 
        },
        order_id:{
            type:Sequelize.STRING,
        },
        policing_id_pri:{
            type:Sequelize.INTEGER,
        },
        customer_id_pri:{
            type:Sequelize.INTEGER,
        },
        drug_id_pri:{
            type:Sequelize.INTEGER,
        },
        opd_id:{
            type:Sequelize.INTEGER,
        },
        order_name:{
            type:Sequelize.STRING,
        },
        order_price:{
            type:Sequelize.DECIMAL,
        },
        order_total:{
            type:Sequelize.DECIMAL,
        },
        order_amount:{
            type:Sequelize.INTEGER,
        },
        order_date:{
            type:Sequelize.STRING,
           
        },
    },{timestamps: false}
);





(async () => {
    await order.sync({ force: false});
})();

module.exports = order;