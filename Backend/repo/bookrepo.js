const Pool = require('pg').Pool
const {sequelize} = require('../models/book')
const { generateOTP, sendOTP } = require("../utils/otp");

const pool = new Pool({
  user: 'kobosuperuser',
  host: '4.213.65.67',
  database: 'kobosuperdb',
  password: 'Rrr1T%^$-@i8t0$',
  port: 5433,
})
class UserRepository {

    constructor(User) {
        this.User = User;
        this.Pool = pool
    }

    addUser(email, OTP, OTPCreatedTime, OTPAttempts,isBlocked) {
        return this.User.create({
          email,
          OTP,
          OTPCreatedTime,
          OTPAttempts,
          isBlocked
        });
      }

      getAllUser() {
        return this.User.findAll();
      }
    
      getUserById(email) {
        return this.User.findOne({ 
          where: {
            email: email
          }
        }).then(function(user) {
          if (!user) {
              return 'user not found';
          }
          return user.dataValues;
        });
      }
    
      async updateUserById(email, OTP, OTPCreatedTime, OTPAttempts,isBlocked) {
        var updatedUserObject = {};
        //const {count} = await 
        return this.User.update( 
          { email: email, OTP: OTP, OTPCreatedTime: OTPCreatedTime,OTPAttempts:OTPAttempts,isBlocked:isBlocked},                    
          {returning: true, plain: true, where: {email: email} }).then(function(result) {  
            
            if (result != null && result.length > 0){              
              // console.log('updated record ' + result[1].dataValues);          
              return result[1].dataValues;
            } else {
              return updatedUserObject;
            }
                          
          });
        
      }

      
    
      async deleteUserById(email) {
        const count = await this.User.destroy({ 
          where: {
            email: email
          }
        })
        // console.log('deleted row(s):' + count);
        /*.then(function(count) {
          if (!count) {
              return 'book not found';
          }
          return count;
        });*/

        return count;
      }  


      async generateOTP(email){
        try {
          let user = await this.User.findOne({ where: { email: email } });
          let useremail
          // If user does not exist, create a new user
          if (!user) {
            useremail=false
            user = { email: email };
          }else{
            useremail=true
          }
      
          // If user is blocked, return an error
          if (user.isBlocked) {
            const currentTime = new Date();
            if (currentTime < user.blockUntil) {
              return "Account blocked. Try after some time."
            } else {
              user.isBlocked = false;
              user.OTPAttempts = 0;
            }
          }
      
          // Check for minimum 1-minute gap between OTP requests
          const lastOTPTime = user.OTPCreatedTime;
          const currentTime = new Date();
      
          if (lastOTPTime && currentTime - lastOTPTime < 60000) {
            return "Minimum 1-minute gap required between OTP requests"
          }
      
          const OTP = generateOTP();
          user.OTP = OTP;
          user.OTPCreatedTime = currentTime;
      
          // await user.save();
          console.log("usersss",user)
          if(!useremail){
            let result = this.addUser(user.email, user.OTP, user.OTPCreatedTime, user.OTPAttempts,user.isBlocked)
          }else{
            let result = this.updateUserById(email, user.OTP, user.OTPCreatedTime, user.OTPAttempts,user.isBlocked)
          }
          sendOTP(email, OTP);

          return "OTP sent successfully"
        } catch (err) {
          console.log(err);
          return "Server error"
        }
      }

      async login(email,OTP){
        try {
          console.log("ques",email,OTP)
          const user = await this.User.findOne({ where: { email: email } });
      
          if (!user) {
            return "User not found"
          }
      
          // Check if user account is blocked
          if (user.isBlocked) {
            const currentTime = new Date();
            if (currentTime < user.blockUntil) {
              return "Account blocked. Try after some time."
            } else {
              user.isBlocked = false;
              user.OTPAttempts = 0;
            }
          }
      
          // Check OTP
          if (user.OTP !== OTP) {
            user.OTPAttempts++;
      
            // If OTP attempts >= 5, block user for 1 hour
            if (user.OTPAttempts >= 5) {
              user.isBlocked = true;
              let blockUntil = new Date();
              blockUntil.setHours(blockUntil.getHours() + 1);
              user.blockUntil = blockUntil;
            }
      
            await user.save();
      
            return "Invalid OTP"
          }
      
          // Check if OTP is within 5 minutes
          const OTPCreatedTime = user.OTPCreatedTime;
          const currentTime = new Date();
      
          if (currentTime - OTPCreatedTime > 5 * 60 * 1000) {
            return "OTP expired"
          }
      
          // Clear OTP
          user.OTP = undefined;
          user.OTPCreatedTime = undefined;
          user.OTPAttempts = 0;
      
          await user.save();
          return "User logged in successfully"
        } catch (err) {
          console.log(err);
          return "Server error"
        }
      }

      async getData(username){
        console.log("usernaem",username)
        return sequelize.query('SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf) AS t1 WHERE statehead = :username OR responsible_person= :username ',
        { replacements: { username: username }, type: sequelize.QueryTypes.SELECT }).then(result => {
            return result
        })
      } 

      async updateData(){
        let queries={"a&y":"update ay_dataset_final ay set actual='200', 'comments'='test' from (select * from (select * from (select * from ay_dataset_final adf union select * from gender_dataset_final gdf union select * from pd_dataset_final pdf union * from srh_dataset_final sdf )as t1 where statehead ='sunilthomasjacob'  or responsible_person='sunilthomasjacob')as t2 where unique_id='AY_44') as t3 where t3.unique_id=ay.unique_id;",
      "pd":"update pd_dataset_final pd set actual='200','comments'='test' from (select * from (select * from (select * from ay_dataset_final adf union select * from gender_dataset_final gdf union select * from pd_dataset_final pdf union select * from srh_dataset_final sdf )as t1 where statehead ='sunilthomasjacob'  or responsible_person='sunilthomasjacob')as t2 where unique_id='AY_44') as t3 where t3.unique_id=pd.unique_id;","srh":"update srh_dataset_final srh set actual='200','comments'='test' from (select * from (select * from (select * from ay_dataset_final adf union select * from gender_dataset_final gdf union select * from pd_dataset_final pdf union select * from srh_dataset_final sdf )as t1 where statehead ='sunilthomasjacob'  or responsible_person='sunilthomasjacob')as t2 where unique_id='AY_44') as t3 where t3.unique_id=srh.unique_id;",}
      }
}

module.exports = {
    UserRepository,
};