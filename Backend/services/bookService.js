

const customResourceResponse = require('../utils/constant');

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async addUser(req) {
        const { email } = req.body;
        const { OTP } = req.body;
        const { OTPCreatedTime } = req.body;
        const { OTPAttempts } = req.body
        const { isBlocked } = req.body

        const response = {};

        if (!email || !OTP || !OTPCreatedTime || !OTPAttempts || !isBlocked) {
            response.message = customResourceResponse.reqValidationError.message;
            response.statusCode = customResourceResponse.reqValidationError.statusCode;
            return response;
        }

        const user = await this.userRepo.addUser(email, OTP, OTPCreatedTime, OTPAttempts, isBlocked);

        if (!user) {
            response.message = customResourceResponse.serverError.message;
            response.statusCode = customResourceResponse.serverError.statusCode;
            return response;
        }

        response.message = customResourceResponse.reqCreated.message;
        response.statusCode = customResourceResponse.reqCreated.statusCode;
        response.data = user;

        return response;

    }

    async getAllUser() {

        const response = {};

        const user = await this.userRepo.getAllUser();

        if (!user) {
            response.message = customResourceResponse.recordNotFound.message;
            response.statusCode = customResourceResponse.recordNotFound.statusCode;
            return response;
          }
        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        response.data = user;

        return response;
    }


    async getUserById(req) {
        const response = {};
        const { email } = req.body;
        const user = await this.userRepo.getUserById(email);
        if (!user) {
          response.message = customResourceResponse.recordNotFound.message;
          response.statusCode = customResourceResponse.recordNotFound.statusCode;
          return response;
        }
        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        response.data = user;
        return response;
    }

    async updateUserById(req) {
       
        const { email } = req.body;
        const { OTP } = req.body;
        const { OTPCreatedTime } = req.body;
        const { OTPAttempts } = req.body
        const { isBlocked } = req.body
    
        const response = {};

        
        const updatedUser = await this.userRepo.updateUserById(email, OTP, OTPCreatedTime, OTPAttempts, isBlocked);
        if (updatedUser === null) {
          response.message = customResourceResponse.recordNotFound.message;
          response.statusCode = customResourceResponse.recordNotFound.statusCode;
          return response;
        }
    
        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        response.data = updatedUser;
        return response;
    }

    async deleteUserById(req) {
        const response = {};
        const { email } = req.params;
    
        const deletedUser = await this.userRepo.deleteUserById(email);
        if (!deletedUser) {
          response.message = customResourceResponse.recordNotFound.message;
          response.statusCode = customResourceResponse.recordNotFound.statusCode;
          return response;
        }
    
        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        return response;
      }

    async generateOTP(req){
        const response = {};
        const { email } = req.body; 

        const msg = await this.userRepo.generateOTP(email);
        if (msg!="OTP sent successfully") {
        //   response.message = customResourceResponse.recordNotFound.message;
          response.message = msg;
          response.statusCode = customResourceResponse.recordNotFound.statusCode;
          return response;
        }
    
        response.message = customResourceResponse.success.message;
        response.statusCode = customResourceResponse.success.statusCode;
        return response;        
    }

    async login(req){
        const response = {};
        const { email } = req.body;
        const { OTP } = req.body; 
 
        const msg = await this.userRepo.login(email,OTP);

        if (msg != "User logged in successfully") {
        //   response.message = customResourceResponse.recordNotFound.message;
          response.message = msg;
          response.statusCode = customResourceResponse.recordNotFound.statusCode;
          return response;
        }
    
        // response.message = customResourceResponse.success.message;
        response.message = msg;
        response.statusCode = customResourceResponse.success.statusCode;
        return response;  
    }

    async getData(req){
      const response = {};
      const { username } = req.body;

      const data = await this.userRepo.getData(username);
      console.log("data",data)
      if (!data) {
        response.message = customResourceResponse.recordNotFound.message;
        response.statusCode = customResourceResponse.recordNotFound.statusCode;
        return response;
      }
  
      response.message = customResourceResponse.success.message;
      response.data = data;
      response.statusCode = customResourceResponse.success.statusCode;
      return response;  
    }

}

module.exports = {
    UserService,
};