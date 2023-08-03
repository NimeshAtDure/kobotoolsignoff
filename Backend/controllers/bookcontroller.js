const { UserService } = require('../services/bookService');
const { UserRepository} = require('../repo/bookrepo');

const {User} = require('../models/book');


const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

exports.addUser = async (req, res, next) => {
    try {
        const response = await userService.addUser(req);
        res.statusCode = response.statusCode;

        return res.json({message: response.message, data: response.data});
    } catch (error) {
        next (error);
    }
};


exports.getAllUser = async (req, res, next) => {
    try {
      const response = await userService.getAllUser(req);
      res.statusCode = response.statusCode;
      return res.json({ message: response.message, data: response.data });
    } catch (error) {
      next(error);
    }
  };
  exports.getUserById = async (req, res, next) => {
    try {
      const response = await userService.getUserById(req);
      res.statusCode = response.statusCode;
      return res.json({ message: response.message, data: response.data });
    } catch (error) {
      next(error);
    }
  };
  
  exports.updateUserById = async (req, res, next) => {
    try {
      const response = await userService.updateUserById(req);
      res.statusCode = response.statusCode;
      return res.json({ message: response.message, data: response.data });
    } catch (error) {
      next(error);
    }
  };
  
  exports.deleteUserById = async (req, res, next) => {
    try {
      const response = await userService.deleteUserById(req);
      res.statusCode = response.statusCode;
      return res.json({ message: response.message, data: response.data });
    } catch (error) {
      next(error);
    }
};

exports.generateOTP = async (req, res, next) => {
  try {
    const response = await userService.generateOTP(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const response = await userService.login(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.getData = async (req, res, next) => {
  try {
    const response = await userService.getData(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.updateData = async (req, res, next) => {
  try {
    const response = await userService.updateData(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.stateSignoff = async (req, res, next) => {
  try {
    const response = await userService.stateSignoff(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.resppersonSignoff = async (req, res, next) => {
  try {
    const response = await userService.resppersonSignoff(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.thematicheadSignoff = async (req, res, next) => {
  try {
    const response = await userService.thematicheadSignoff(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.MNEheadSignoff = async (req, res, next) => {
  try {
    const response = await userService.MNEheadSignoff(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.MNEheadSignoffoi = async (req, res, next) => {
  try {
    const response = await userService.MNEheadSignoffoi(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.CMTheadSignoff = async (req, res, next) => {
  try {
    const response = await userService.CMTheadSignoff(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}

exports.CMTheadSignoffoi = async (req, res, next) => {
  try {
    const response = await userService.CMTheadSignoffoi(req);
    res.statusCode = response.statusCode;
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    next(error);
  }
}