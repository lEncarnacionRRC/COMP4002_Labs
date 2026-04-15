import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeService from "../services/employeeService";

export const getAllEmployees = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employees = await employeeService.getAllEmployees();

    res.status(HTTP_STATUS.OK).json(successResponse(employees, "Employees retrieved successfully."));

  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName, departmentId } = req.body;

    const newEmployee = await employeeService.createEmployee({
      firstName,
      lastName,
      departmentId
    });

    res.status(HTTP_STATUS.CREATED).json(successResponse(newEmployee, "Employee created successfully."));

  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departments = await employeeService.getDepartments();

    res.status(HTTP_STATUS.OK).json(successResponse(departments, "Departments retrieved successfully."));

  } catch (error) {
    next(error);
  }
};

export const getLeadership = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const leadership = await employeeService.getLeadership();

    res.status(HTTP_STATUS.OK).json(successResponse(leadership, "Leadership data retrieved successfully."));

  } catch (error) {
    next(error);
  }
};
