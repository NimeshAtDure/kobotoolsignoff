const Pool = require('pg').Pool
const { sequelize } = require('../models/book')
const { generateOTP, sendOTP } = require("../utils/otp");
const path = require('path')
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

  addUser(email, OTP, OTPCreatedTime, OTPAttempts, isBlocked) {
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
    }).then(function (user) {
      if (!user) {
        return 'user not found';
      }
      return user.dataValues;
    });
  }

  async updateUserById(email, OTP, OTPCreatedTime, OTPAttempts, isBlocked) {
    var updatedUserObject = {};
    //const {count} = await 
    return this.User.update(
      { email: email, OTP: OTP, OTPCreatedTime: OTPCreatedTime, OTPAttempts: OTPAttempts, isBlocked: isBlocked },
      { returning: true, plain: true, where: { email: email } }).then(function (result) {

        if (result != null && result.length > 0) {
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


  async generateOTP(email) {
    try {
      let user = await this.User.findOne({ where: { email: email } });
      let useremail
      // If user does not exist, create a new user
      if (!user) {
        useremail = false
        user = { email: email };
      } else {
        useremail = true
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
        return "OTP already sent. Please try after sometime."
      }

      const OTP = generateOTP();
      user.OTP = OTP;
      user.OTPCreatedTime = currentTime;

      // await user.save();
      // console.log("usersss", user)
      if (!useremail) {
        let result = this.addUser(user.email, user.OTP, user.OTPCreatedTime, user.OTPAttempts, user.isBlocked)
      } else {
        let result = this.updateUserById(email, user.OTP, user.OTPCreatedTime, user.OTPAttempts, user.isBlocked)
      }
      // sendOTP(email, OTP);

      return "OTP sent successfully"
    } catch (err) {
      console.log(err);
      return "Server error"
    }
  }

  async login(email, OTP) {
    try {
      // console.log("ques", email, OTP)
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

  async getData(username,usertype) {
    // var queries = { 
    //   "statehead":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM srh_dataset_final sdf UNION SELECT * FROM pd_dataset_final pdf )main WHERE main.statehead=:username;",

    //   "respperson":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM srh_dataset_final sdf UNION SELECT * FROM pd_dataset_final pdf )main WHERE main.responsible_person=:username;",

    //   "admin":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf) AS t1",
      
    //   "all":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf) AS t1 WHERE statehead = :username OR responsible_person= :username "
    // }

    var queries = { 
      // "statehead":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2 WHERE statehead =:username );",

      // "statehead":"SELECT * FROM get_statehead_view(:username);",

      "statehead":"SELECT * FROM get_view_statehead(:username);",

      // "respperson":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2 WHERE responsible_person =:username)and statehead_approved='Yes';",

      // "respperson":"SELECT * FROM get_responsiblepersion_view(:username);",

      "respperson":"SELECT * FROM get_view_responsibleperson(:username);",

      // "thematichead":"SELECT * FROM get_thematichead_view (:username);",

      "thematichead":"SELECT * FROM get_view_thematicperson (:username);",

      // "mnehead":"SELECT * FROM get_mehead_view (:username);",

      "mneheadsis":"SELECT * FROM get_view_m_e_data(:username);",

      "mneheadoi":"SELECT * FROM get_oi_view_m_e_data(:username);",

      "cmtheadsis":"SELECT * FROM get_view_cmt_data();",

      "cmtheadoi":"SELECT * FROM get_view_oi_cmt_data();",

      "progressovsis":"SELECT * FROM cmt_data WHERE form_name='SIS' AND cmt_approved='Yes';",

      "progressovoi":"SELECT * FROM cmt_data WHERE form_name <>'SIS' AND cmt_approved='Yes';",

      "admin":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2);",
      
      // "all":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2 WHERE statehead =:username OR responsible_person =:username OR thematichead=:username); "

      "all":"SELECT * FROM statehead_data sd WHERE statehead =:username OR responsible_person =:username OR thematichead=:username;"
    }
    
    return sequelize.query(queries[usertype],
        { replacements: { username: username }, type: sequelize.QueryTypes.SELECT }).then(result => {
          return result
        })
  }

  async updateData(username,id,actual,comment,respcomment,type) {
    let queries = {
      // "a&y": "UPDATE ay_dataset_final ay SET actual=:editactual,comments=:editcomment,updated_by_statehead_on=:stateupdttime,updated_by_responsible_person_on=:respupdttime FROM (SELECT * FROM (SELECT * FROM ay_dataset_final adf WHERE adf.statehead =:username OR adf.responsible_person=:username) AS t1 ) AS t4 WHERE t4.unique_id=:id and t4.unique_id=ay.unique_id",
      
      // "pd": "UPDATE pd_dataset_final pd SET actual=:editactual,comments=:editcomment,updated_by_statehead_on=:stateupdttime,updated_by_responsible_person_on=:respupdttime FROM (SELECT * FROM (SELECT * FROM pd_dataset_final pd WHERE pd.statehead =:username OR pd.responsible_person=:username) AS t1 ) AS t4 WHERE t4.unique_id=:id and t4.unique_id=pd.unique_id",                                                                                                "srh": "UPDATE srh_dataset_final srh SET actual=:editactual,comments=:editcomment,updated_by_statehead_on=:stateupdttime,updated_by_responsible_person_on=:respupdttime FROM (SELECT * FROM (SELECT * FROM srh_dataset_final srh WHERE srh.statehead =:username OR srh.responsible_person=:username) AS t1 ) AS t4 WHERE t4.unique_id=:id and t4.unique_id=srh.unique_id",

      // "gender": "UPDATE gender_dataset_final g SET actual=:editactual,comments=:editcomment,updated_by_statehead_on=:stateupdttime,updated_by_responsible_person_on=:respupdttime FROM (SELECT * FROM (SELECT * FROM gender_dataset_final g WHERE g.statehead =:username OR g.responsible_person=:username) AS t1 ) AS t4 WHERE t4.unique_id=:id and t4.unique_id=g.unique_id"

      // "statehead":	"SELECT * FROM custom_dataupdate_statehead(:username,:id,:editactual,:editcomment);",

      "statehead":	"SELECT * FROM update_data_statehead(:username,:id,:editactual,:editcomment);",

      "respperson":"SELECT * FROM update_data_responsibleperson(:username,:id,:editactual,:editcomment,:respcomment);",

      "thematichead":"SELECT * FROM update_data_thematicperson(:username,:id,:respcomment);",

      "mnehead":"SELECT * FROM update_data_m_e_head(:username,:id,:respcomment);",

      "cmthead":"SELECT * FROM update_data_cmt_head(:id,:respcomment);"

    }

    // console.log("data",username, actual, comment, theme,id,stateupdttime,respupdttime)
    return await sequelize.query(queries[type],
      { replacements: { username: username, editactual:actual, editcomment:comment,respcomment:respcomment, id:id }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async stateSignoff(username){
    return await sequelize.query("SELECT * FROM update_flag_signoff_statehead(:username);",
      { replacements: { username: username }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async resppersonSignoff(username){
    return await sequelize.query("SELECT * FROM update_flag_signoff_responsibleperson(:username)",
      { replacements: { username: username }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async thematicheadSignoff(username){
    return await sequelize.query(" SELECT * FROM update_flag_signoff_thematicperson(:username)",
      { replacements: { username: username }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async MNEheadSignoff(username){
    return await sequelize.query("SELECT * FROM update_flag_signoff_m_e_data(:username)",
      { replacements: { username: username }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async MNEheadSignoffoi(username){
    return await sequelize.query("SELECT * FROM update_flag_signoff_oi_m_e_data(:username)",
      { replacements: { username: username }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async CMTheadSignoff(username){
    return await sequelize.query("SELECT * FROM update_flag_signoff_cmt_data()",
      { replacements: { username: username }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async uploadfile(req){
    try{
      let sampleFile,thumbnail;
      let uploadPath,tuploadPath;
      console.log(req);
      if (!req.files || Object.keys(req.files).length === 0) {
        return ''
      }

      sampleFile = req.files.file
      thumbnail = req.files.tbnail
      uploadPath = 'http://localhost:8080/documents/' + sampleFile.name.replace(/\s/g, "");
      tuploadPath = 'http://localhost:8080/thumbnails/' + thumbnail.name.replace(/\s/g, "");

      console.log(req,uploadPath,tuploadPath);
      sampleFile.mv(uploadPath, function(err) {
        if (err){
          return ''
        }
      });

      thumbnail.mv(tuploadPath, function(err) {
        if (err){
          return ''
        }
      });

      return await sequelize.query("INSERT INTO documents(name,dir,sdir,file,tbnail) VALUES (:name,:dir,:sdir,:fname,:tbnail)",
      { replacements: { name:req.body.fname,dir:req.body.dname,sdir:req.body.sdname,fname:uploadPath,tbnail:tuploadPath }, type: sequelize.QueryTypes.INSERT })
      .then(result => {
        // console.log("results",result)
        return result
      })
      // return "file uploaded"
      
    }catch(err){
      console.log(err);
      return ''
    }
  }

  async getfile(){
    return await sequelize.query("SELECT * FROM documents d",
      { replacements: {  }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

}


module.exports = {
  UserRepository,
};