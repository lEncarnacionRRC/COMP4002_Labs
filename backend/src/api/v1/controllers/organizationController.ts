import type { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getOrganization = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(HTTP_STATUS.OK).json(successResponse({}, "Organization retrieved successfully."));
  } catch (error) {
    next(error);
  }
};

export const getDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Department ID is required."));
      return;
    }

    res.status(HTTP_STATUS.OK).json(successResponse({}, "Department retrieved successfully."));
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { departmentName } = req.body;

    if (!departmentName) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Department name is required."));
      return;
    }
    res.status(HTTP_STATUS.CREATED).json(successResponse({}, "Department created successfully."));
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { departmentName } = req.body;

    if (!departmentName) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Department name is required."));
      return;
    }
    
    res.status(HTTP_STATUS.OK).json(successResponse({}, "Department updated successfully."));
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.params.id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Department ID is required."));
      return;
    }

    res.status(HTTP_STATUS.OK).json(successResponse(null, "Department deleted successfully."));
  } catch (error) {
    next(error);
  }
};

export const assignEmployeeToRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { employeeId, role } = req.body;

    if (!employeeId || !role) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("Employee ID and role are required."));
      return;
    }

    res.status(HTTP_STATUS.OK).json(successResponse({}, "Employee assigned to role successfully."));
  } catch (error) {
    next(error);
  }
};
