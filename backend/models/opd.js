const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

// const Customer = require("./customer")

const opd = sequelize.define(
    "opd", {
        opd_id:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
        },
        opd_code:{
            type:Sequelize.STRING,
            get: function() {
                return "CN00"+this.getDataValue('opd_id').toString();
              }
        },
        customer_id_pri:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        room_id:{
            type:Sequelize.INTEGER,
        },
        opd_date:{
            type:Sequelize.STRING,
           
        },
        opd_t:{
            type:Sequelize.STRING,
            allowNull:true,
          
        },
        opd_p:{
            type:Sequelize.STRING,
            
        },
        opd_rr:{
            type:Sequelize.STRING,
            
        },
        opd_bp:{
            type:Sequelize.STRING,
            
        },
        opd_w:{
            type:Sequelize.STRING,
            
        },
        opd_h:{
            type:Sequelize.STRING,
            
        },
        opd_bmi:{
            type:Sequelize.STRING,
           
        },
        opd_fbs:{
            type:Sequelize.STRING,
            
        },
        opd_pe:{
            type:Sequelize.STRING,
           
        },
        opd_ga:{
            type:Sequelize.STRING,
            
        },
        opd_cc:{
            type:Sequelize.STRING,
            
        },
        opd_hpi:{
            type:Sequelize.STRING,
            
        },
        opd_pmh:{
            type:Sequelize.STRING,
           
        },
        opd_dx:{
            type:Sequelize.STRING,
        },
        opd_check:{ 
            type:Sequelize.TINYINT
        },
        order_check:{
            type:Sequelize.TINYINT
        },
        order_code:{
            type:Sequelize.STRING,
            get: function() {
                return "RE00"+this.getDataValue('opd_id').toString();
              }
        }
    },{ timestamps: false }
);

// const Opd = sequelize.define(
//     "opd", {
//         opd_id:{
//             type:Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true, 
//         },
//         opd_code:{
//             type:Sequelize.STRING,
//             get: function() {
//                 return "CN00"+this.getDataValue('opd_id').toString();
//               }
//         },
//         customer_id_pri:{
//             type:Sequelize.INTEGER,
            
//             allowNull:false,
//         },
//         room_id:{
//             type:Sequelize.INTEGER,
//         },
//         opd_date:{
//             type:Sequelize.STRING,
           
//         },
//         opd_t:{
//             type:Sequelize.STRING,
          
//         },
//         opd_p:{
//             type:Sequelize.STRING,
            
//         },
//         opd_rr:{
//             type:Sequelize.STRING,
            
//         },
//         opd_bp:{
//             type:Sequelize.STRING,
            
//         },
//         opd_w:{
//             type:Sequelize.STRING,
            
//         },
//         opd_h:{
//             type:Sequelize.STRING,
            
//         },
//         opd_bmi:{
//             type:Sequelize.STRING,
           
//         },
//         opd_fbs:{
//             type:Sequelize.STRING,
            
//         },
//         opd_pe:{
//             type:Sequelize.STRING,
           
//         },
//         opd_ga:{
//             type:Sequelize.STRING,
            
//         },
//         opd_cc:{
//             type:Sequelize.STRING,
            
//         },
//         opd_hpi:{
//             type:Sequelize.STRING,
            
//         },
//         opd_pmh:{
//             type:Sequelize.STRING,
           
//         },
//         opd_dx:{
//             type:Sequelize.STRING,
//         },
//         opd_check:{ 
//             type:Sequelize.TINYINT
//         }
//     },{ timestamps: false }
// );

// const Customer = sequelize.define(
//     "customer",
//     {
//         customer_id_pri:{
//             type: Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true //id แบบ Auto **ใช้ id นี้เป็นหลักในการ query**
//         },
//         customer_id:{
//             type: Sequelize.STRING,
//             allowNull: false,  //รหัสลูกค้าแบบตั้งเอง
//         },
//         customer_status_id:{
//             type: Sequelize.INTEGER,
//             defaultValue: 1,
//         },
//         customer_idcard:{
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         customer_fname:{
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         customer_lname:{
//             type: Sequelize.STRING,
//             allowNull: false,
//         },
//         customer_birthdate:{
//             type: Sequelize.STRING,
//         },
//         customer_prefix:{
//             type: Sequelize.STRING,
//         },
//         customer_gender:{
//             type: Sequelize.STRING,
//         },
//         customer_tel:{
//             type: Sequelize.STRING,
//         },
//         customer_image:{
//             type: Sequelize.STRING,
//             defaultValue: "-"
//         },
        
//     },{}
// );

// customer.hasMany(opd, {foreignKey: 'customer_id_pri'})
// opd.belongTo(customer, {foreignKey: 'customer_id_pri'})

// Customer.hasMany(Opd)
// Opd.belongsTo(Customer)




(async () => {
    await opd.sync({ force: false});
})();
// Opd.hasMany(Customer)
// Customer.belongsTo(Opd)
module.exports = opd;