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

// const pool = new Pool({
//   user: 'uatkobosuperuser',
//   host: '20.219.28.160',
//   database: 'uatkobosuperdb',
//   password: 'PRiJvMX8TyrT8',
//   port: 5433,
// })
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

  async getData(username,usertype,quarter,year) {
    // var queries = { 
    //   "statehead":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM srh_dataset_final sdf UNION SELECT * FROM pd_dataset_final pdf )main WHERE main.statehead=:username;",

    //   "respperson":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM srh_dataset_final sdf UNION SELECT * FROM pd_dataset_final pdf )main WHERE main.responsible_person=:username;",

    //   "admin":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf) AS t1",
      
    //   "all":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf) AS t1 WHERE statehead = :username OR responsible_person= :username "
    // }

    var queries = { 
      // "statehead":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2 WHERE statehead =:username );",

      // "statehead":"SELECT * FROM get_statehead_view(:username);",

      "statehead":"SELECT * FROM get_view_statehead(:username,:quarter,:year);",

      // "respperson":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2 WHERE responsible_person =:username)and statehead_approved='Yes';",

      // "respperson":"SELECT * FROM get_responsiblepersion_view(:username);",

      "respperson":"SELECT * FROM get_view_responsibleperson(:username,:quarter,:year);",

      // "thematichead":"SELECT * FROM get_thematichead_view (:username);",

      "thematichead":"SELECT * FROM get_view_thematicperson (:username,:quarter,:year);",

      // "mnehead":"SELECT * FROM get_mehead_view (:username);",

      "mneheadsis":"SELECT * FROM get_view_m_e_data(:username,:quarter,:year);",

      "mneheadoi":"SELECT * FROM get_oi_view_m_e_data(:username,:quarter,:year);",

      "cmtheadsis":"SELECT * FROM get_view_cmt_data(:quarter,:year);",

      "cmtheadoi":"SELECT * FROM get_view_oi_cmt_data(:quarter,:year);",

      "cpapstate":"SELECT * FROM get_view_cpap_statehead(:username,:year)",

      "cpapthematic":"SELECT * FROM get_view_cpap_thematicperson(:username,:year)",

      "cpapmne":"SELECT * FROM get_view_cpap_m_e_data(:username,:year)",

      "rrfstate":"SELECT * FROM get_view_rrf_statehead(:username,:year)",

      "rrfthematic":"SELECT * FROM get_view_rrf_thematicperson(:username,:year)",

      "rrfmne":"SELECT * FROM get_view_rrf_m_e_data(:username,:year)",

      "progressovsis":"SELECT * FROM cmt_data WHERE form_name='SIS' AND cmt_approved='Yes' AND quarter =:quarter AND year=:year;",

      "progressovoi":"SELECT * FROM cmt_data WHERE form_name <>'SIS' AND cmt_approved='Yes'AND quarter =:quarter AND year=:year;",

      'progressovcpap':"SELECT * from get_progress_view_cpap(:year)",

      'progressovrrf':"SELECT * from get_progress_view_rrf(:year)",

      "admin":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2);",
      
      // "all":"SELECT * FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 WHERE _id IN (SELECT _id FROM (SELECT MAX(_id) AS _id,quarter,questionname,state,thematic FROM (SELECT * FROM ay_dataset_final adf UNION SELECT * FROM gender_dataset_final gdf UNION SELECT * FROM pd_dataset_final pdf UNION SELECT * FROM srh_dataset_final sdf )AS t1 GROUP BY quarter,questionname,state,thematic)t2 WHERE statehead =:username OR responsible_person =:username OR thematichead=:username); "

      "all":"SELECT * FROM statehead_data sd WHERE statehead =:username OR responsible_person =:username OR thematichead=:username;"
    }
    
    return sequelize.query(queries[usertype],
        { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT }).then(result => {
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

      "thematichead":"SELECT * FROM update_data_thematicperson(:username,:id,:editactual,:respcomment);",

      "mnehead":"SELECT * FROM update_data_m_e_head(:username,:id,:respcomment);",

      "cmthead":"SELECT * FROM update_data_cmt_head(:id,:respcomment);",

      "cpapstate":"SELECT * FROM update_data_cpap_statehead(:username,:id,:editactual,:editcomment)",

      "cpapthematic":"SELECT * FROM update_data_cpap_thematicperson(:username,:id,:editactual,:respcomment)",

      "cpapmne":"SELECT * FROM update_data_cpap_m_e_head(:username,:id,:respcomment);",

      "rrfstate":"SELECT * FROM update_data_rrf_statehead(:username,:id,:editactual,:editcomment)",

      "rrfthematic":"SELECT * FROM update_data_rrf_thematicperson(:username,:id,:editactual,:respcomment)",

      "rrfmne":"SELECT * FROM update_data_rrf_m_e_head(:username,:id,:respcomment);"

    }

    console.log("data",username,id,actual,comment,respcomment,type)
    // console.log(queries[usertype]);
    return await sequelize.query(queries[type],
      { replacements: { username: username, editactual:actual, editcomment:comment,respcomment:respcomment, id:id }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async stateSignoff(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_statehead(:username,:quarter,:year);",
      { replacements: { username: username,quarter:quarter,year:year  }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async resppersonSignoff(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_responsibleperson(:username,:quarter,:year)",
      { replacements: { username: username,quarter:quarter,year:year  }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async thematicheadSignoff(username,quarter,year){
    return await sequelize.query(" SELECT * FROM update_flag_signoff_thematicperson(:username,:quarter,:year)",
      { replacements: { username: username,quarter:quarter,year:year  }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async MNEheadSignoff(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_m_e_data(:username,:quarter,:year)",
      { replacements: { username: username,quarter:quarter,year:year  }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async MNEheadSignoffoi(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_oi_m_e_data(:username,:quarter,:year)",
      { replacements: { username: username,quarter:quarter,year:year  }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async CMTheadSignoff(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_cmt_data(:quarter,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async stateheadSignOffcpap(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_cpap_statehead(:username,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async thematicheadSignOffcpap(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_cpap_thematicperson(:username,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async mneSignOffcpap(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_cpap_m_e_data(:username,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }
  
  async stateheadSignOffrrf(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_rrf_statehead(:username,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async thematicheadSignOffrrf(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_rrf_thematicperson(:username,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async mneSignOffrrf(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_rrf_m_e_data(:username,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async CMTheadSignoffoi(username,quarter,year){
    return await sequelize.query("SELECT * FROM update_flag_signoff_oi_cmt_data(:quarter,:year)",
      { replacements: { username: username,quarter:quarter,year:year }, type: sequelize.QueryTypes.SELECT })
      .then(result => {
        // console.log("results",result)
        return result
      })
  }

  async uploadfile(req){
    try{
      let sampleFile,thumbnail;
      let uploadPath,tuploadPath,movePath,tmovePath;
      console.log(req);
      if (!req.files || Object.keys(req.files).length === 0) {
        return ''
      }

      sampleFile = req.files.file
      thumbnail = req.files.tbnail
      movePath = path.join(__dirname,"../public/documents/")+ sampleFile.name.replace(/\s/g, "");
      tmovePath = path.join(__dirname,"../public/thumbnails/")+ thumbnail.name.replace(/\s/g, "");
      uploadPath = 'http://localhost:8080/documents/' + sampleFile.name.replace(/\s/g, "");
      tuploadPath = 'http://localhost:8080/thumbnails/' + thumbnail.name.replace(/\s/g, "");

      // console.log(req,uploadPath,tuploadPath,movePath);
      sampleFile.mv(movePath, function(err) {
        if (err){
          console.log(err);
          return ''
        }
      });

      thumbnail.mv(tmovePath, function(err) {
        if (err){
          console.log(err);
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