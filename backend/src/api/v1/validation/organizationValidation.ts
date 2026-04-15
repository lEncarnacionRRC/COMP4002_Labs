import type { ObjectSchema } from "joi";
import Joi from "joi";

export const departmentSchema: ObjectSchema = Joi.object({
    departmentName: Joi.string().required().min(3).messages({
        "any.required": "Department name is required",
        "string.empty": "Department name cannot be blank",
        "string.min": "Department name must be at least 3 characters long."
    }),
    description: Joi.string().optional().min(5).messages({
        "string.min": "Description must be at least 5 characters long."
    })
});
