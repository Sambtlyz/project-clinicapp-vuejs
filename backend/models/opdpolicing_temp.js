const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const opdpolicing_temp = sequelize.define( 
    "opdpolicing_temp", {
        opdpolicing_temp_id:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        opd_id:{
            type:Sequelize.INTEGER,
        },
        policing_id_pri:{
            type:Sequelize.INTEGER,
        },
        customer_id_pri:{
            type:Sequelize.INTEGER,
        },

        opdpolicing_temp_code:{  //เลขที่รายละเอียดการตรวจ
            type:Sequelize.STRING,

        },
        opdpolicing_temp_name:{  //ชื่อรายละเอียดการตรวจ
            type:Sequelize.STRING,
        },
        opdpolicing_temp_cost:{ //ค่าบริการ
            type:Sequelize.DECIMAL,
        },
        opdpolicing_status:{
            type:Sequelize.TINYINT,
            defaultValue: 0,
        },
}, { timestamps: false }
);

(async () => {
    await opdpolicing_temp.sync({ force: false});
})();

module.exports = opdpolicing_temp;