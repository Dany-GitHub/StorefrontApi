import { Request, Response, NextFunction } from 'express';
import { UsersModel, User } from '../models/users.model';
import config from '../config';
import jwt from 'jsonwebtoken';


const usersModel = new UsersModel();

export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: User = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      password: request.body.password
    };
    const create = await usersModel.create(user);
    const authenticatedUser = await usersModel.authenticate(user);
    const token = jwt.sign({ authenticatedUser }, config.token as unknown as string);
    response.json({
      status: 'Success',
      data: { ...create, token },
      message: 'User got created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const showUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id as unknown as string);
    const user = await usersModel.show(id);
    response.json({
      status: 'Success',
      data: { ...user },
      message: 'User got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await usersModel.index();
    response.json({
      status: 'Success',
      data: [...users],
      message: 'Users got retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: User = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      password: request.body.password
    };
    const authenticatedUser = await usersModel.authenticate(user);
    const token = jwt.sign({ authenticatedUser: user }, config.token as unknown as string);
    if (!authenticatedUser) {
      return response.status(401).json({
        status: 'unauthorized user',
        message: 'password is wrong please try again'
      });
    }
    return response.json({
      status: 'success',
      data: { first_name: authenticatedUser.first_name, last_name: authenticatedUser.last_name, token },
      message: 'user authenticated successfully'
    });
  } catch (error) {
    next(error);
  }
};