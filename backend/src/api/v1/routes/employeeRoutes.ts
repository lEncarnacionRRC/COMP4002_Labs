import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../validation/employeeValidation";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

router.get("/employees", employeeController.getAllEmployees);

router.get("/departments", employeeController.getDepartments);

router.get("/leadership", employeeController.getLeadership);

router.post(
    "/employees",
    validateRequest(employeeSchema),
    employeeController.createEmployee
);

export default router;
