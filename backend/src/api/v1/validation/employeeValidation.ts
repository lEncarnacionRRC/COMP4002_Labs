import type { ObjectSchema } from "joi";
import Joi from "joi";

export const employeeSchema: ObjectSchema = Joi.object({
    firstName: Joi.string().required().min(3).messages({
        "any.required": "First name is required",
        "string.empty": "First name cannot be blank",
        "string.min": "First name must be at least 3 characters long."
    }),
    lastName: Joi.string().required().min(3).messages({
        "any.required": "Last name is required",
        "string.empty": "Last name cannot be blank",
        "string.min": "Last name must be at least 3 characters long."
    }),
    departmentId: Joi.string().optional().messages({
        "string.base": "Department ID must be a string"
    })
});
