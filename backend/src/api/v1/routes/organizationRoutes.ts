import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { departmentSchema } from "../validation/organizationValidation";
import * as organizationController from "../controllers/organizationController";

const router: Router = express.Router();

router.get("/organization", organizationController.getOrganization);

router.get("/departments/:id", organizationController.getDepartment);

router.post(
    "/departments",
    validateRequest(departmentSchema),
    organizationController.createDepartment
);

router.put(
    "/departments/:id",
    validateRequest(departmentSchema),
    organizationController.updateDepartment
);

router.delete("/departments/:id", organizationController.deleteDepartment);

router.post(
    "/assign-employee-to-role",
    organizationController.assignEmployeeToRole
);

export default router;
