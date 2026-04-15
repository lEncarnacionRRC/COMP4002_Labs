import { useState } from "react"
import type { Department } from "../../types/Employee"
import { useFormInput } from "../../hooks/useFormInput"
import { employeeService } from "../../services/employeeService"

interface AddEmployeeProps {
  departments: Department[]
  onAddEmployee: (success: boolean, error?: string) => void
}

export default function AddEmployeeToList({
  departments,
  onAddEmployee,
}: AddEmployeeProps) {
  const firstName = useFormInput(
    (value) => employeeService.validateFirstName(value),
    ""
  )
  
  const lastName = useFormInput(
    (value) => employeeService.validateLastName(value),
    ""
  )

  const [departmentValue, setDepartmentValue] = useState(
    departments[0]?.departmentName || ""
  )
  const [departmentError, setDepartmentError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setIsSubmitting(true)

    try {
      const firstNameValid = firstName.validateForm()
      const lastNameValid = lastName.validateForm()

      if (!firstNameValid.isValid || !lastNameValid.isValid) {
        setIsSubmitting(false)
        return
      }

      if (!departmentValue) {
        setDepartmentError("Department is required")
        setIsSubmitting(false)
        return
      }

      setDepartmentError(null)

      const result = await employeeService.createEmployee(
        String(firstName.inputValue),
        String(lastName.inputValue),
        String(departmentValue)
      )

      if (result.isValid) {
        // Success - reset form and notify parent
        firstName.setValue("")
        lastName.setValue("")
        setDepartmentValue(departments[0]?.departmentName || "")
        firstName.setError(null)
        lastName.setError(null)
        setDepartmentError(null)
        setSubmitError("")
        
        onAddEmployee(true)
      } else {
        setSubmitError(result.error || "Failed to create employee")
        onAddEmployee(false, result.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setSubmitError(errorMessage)
      onAddEmployee(false, errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded">
      <h2 className="text-lg font-semibold">Add New Employee</h2>

      {submitError && (
        <p className="text-red-500 text-sm">{submitError}</p>
      )}

      <section className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName.inputValue}
          onChange={firstName.onChange}
          placeholder="Jane"
          className="border rounded px-3 py-2 text-sm"
          disabled={isSubmitting}
        />
        {firstName.error && <p className="text-red-500 text-xs">{firstName.error}</p>}
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName.inputValue}
          onChange={lastName.onChange}
          placeholder="Smith"
          className="border rounded px-3 py-2 text-sm"
          disabled={isSubmitting}
        />
        {lastName.error && <p className="text-red-500 text-xs">{lastName.error}</p>}
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="department" className="text-sm font-medium">
          Department
        </label>
        <select
          id="department"
          value={departmentValue}
          onChange={(e) => {
            setDepartmentValue(e.target.value)
            setDepartmentError(null)
          }}
          className="border rounded px-3 py-2 text-sm"
          disabled={isSubmitting}
        >
          {departments.map((dept) => (
            <option key={dept.departmentName} value={dept.departmentName}>
              {dept.departmentName}
            </option>
          ))}
        </select>
        {departmentError && <p className="text-red-500 text-xs">{departmentError}</p>}
      </section>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Employee"}
      </button>
    </form>
  )
}