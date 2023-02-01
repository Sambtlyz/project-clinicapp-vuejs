const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const customer = sequelize.define(
    "customer",
    {
        customer_id_pri:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true //id แบบ Auto **ใช้ id นี้เป็นหลักในการ query**
        },
        customer_id:{
            type: Sequelize.STRING,
            allowNull: false,  //รหัสลูกค้าแบบตั้งเอง
            get: function() {
                return "HN00"+this.getDataValue('customer_id_pri').toString();
              }
        },
        customer_status_id:{
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        customer_idcard:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        customer_fname:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        customer_lname:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        customer_birthdate:{
            type: Sequelize.STRING,
        },
        customer_prefix:{
            type: Sequelize.STRING,
        },
        customer_gender:{
            type: Sequelize.STRING,
        },
        customer_tel:{
            type: Sequelize.STRING,
        },
        customer_image:{
            type: Sequelize.STRING,
            defaultValue: "-"
        },
        customer_blood:{
            type: Sequelize.STRING,
        },
        customer_email:{
            type: Sequelize.STRING,
        },
        customer_address:{
            type: Sequelize.STRING,
        },
        customer_district:{
            type: Sequelize.STRING,
        },
        customer_amphoe:{
            type: Sequelize.STRING,
        },
        customer_province:{
            type: Sequelize.STRING,
        },
        customer_zipcode:{
            type: Sequelize.NUMBER,
        },
        customer_allergic:{
            type: Sequelize.STRING,
        },
        customer_disease:{
            type: Sequelize.STRING,
        },
        customer_comment:{
            type: Sequelize.STRING,
        }
        
    },{}
);
(async ()=> {
    await customer.sync({ force: false});
})();

module.exports = customer;
