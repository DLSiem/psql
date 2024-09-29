import { Request, Response } from "express";
import User from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  const user = req.body;
  const { email, password } = user;
  try {
    const response = await User.createUser({ email, password });
    if (response.rowCount === 0) {
      res.status(400).json(response);
    }
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await User.getUsers();
    if (response.rowCount === 0) {
      res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a user by id
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);
  try {
    const response = await User.getUserById(id);
    if (response.rowCount === 0) {
      res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      error: "Unexpected response format",
    });
  }
};

// delete a user by id
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);

  try {
    const response = await User.deleteUser(id);
    if (response.rowCount === 0) {
      res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
