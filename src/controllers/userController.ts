import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/models";
import IUser from "src/interfaces/models/IUser";
import { Types } from "mongoose";
import { responseHandler } from "../helpers/helpers";

// @desc Get all users
// @route GET /users
// @access Private
const getAllUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = await User.find().select("-password").exec();
    if (!users) {
      res
        .status(400)
        .json(responseHandler({ status: false, message: "No users found" }));
      return;
    }
    res.json(responseHandler({ status: true, payload: { data: users } }));
  }
);

// @desc Get user by id
// @route GET /users/:id
// @access Private
const getUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("-password").exec();
      if (!user) {
        res
          .status(400)
          .json(responseHandler({ status: false, message: "No user found" }));
        return;
      }
      res
        .status(200)
        .json(responseHandler({ status: true, payload: { data: user } }));
    } catch (error) {
      res.status(500).json(responseHandler({ status: false, message: error }));
    }
  }
);

// @desc Create a user
// @route POST /users
// @access Private
const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, noHp, password } = req.body;

      const salt: string = await bcrypt.genSalt(10);
      const newPassword: string = await bcrypt.hash(password, salt);

      const user: IUser & {
        _id: Types.ObjectId;
      } = await User.create({
        username,
        email,
        noHp,
        password: newPassword,
        roles: ["User"],
      });

      res.status(201).json(
        responseHandler({
          status: true,
          payload: {
            data: {
              username: user.username,
              email: user.email,
              noHp: user.noHp,
              _id: user._id,
            },
          },
        })
      );
    } catch (error) {
      res.status(500).json(responseHandler({ status: false, message: error }));
    }
  }
);

// @desc Update user
// @route PATCH /user
// @access Private
const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {}
);

// @desc Delete user
// @route DELETE /user
// @access Private
const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {}
);

export default {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
};
