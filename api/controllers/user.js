import User from "../models/User.js";

export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updateHotel = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("ข้อมูลผู้ใช้งานถูกลบไปแล้ว");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
