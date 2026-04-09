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
  // Create form inputs with validation methods
  const firstName = useFormInput(
    (value) => employeeService.validateFirstName(value),
    ""
  )
  
  const lastName = useFormInput(
    (value) => employeeService.validateLastName(value),
    ""
  )
  
  const department = useFormInput(
    (value) => employeeService.validateDepartment(value),
    departments[0]?.departmentName || ""
  )

  const [submitError, setSubmitError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    // Validate all inputs
    const firstNameValid = firstName.validateForm()
    const lastNameValid = lastName.validateForm()
    const departmentValid = department.validateForm()

    if (!firstNameValid.isValid || !lastNameValid.isValid || !departmentValid.isValid) {
      return
    }

    // All valid, attempt to create employee through service
    const result = employeeService.createEmployee(
      String(firstName.inputValue),
      String(lastName.inputValue),
      String(department.inputValue)
    )

    if (result.isValid) {
      // Success - reset form and notify parent
      firstName.setValue("")
      lastName.setValue("")
      department.setValue(departments[0]?.departmentName || "")
      firstName.setError(null)
      lastName.setError(null)
      department.setError(null)
      setSubmitError("")
      
      onAddEmployee(true)
    } else {
      // Failure - show error
      setSubmitError(result.error || "Failed to create employee")
      onAddEmployee(false, result.error)
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
        />
        {lastName.error && <p className="text-red-500 text-xs">{lastName.error}</p>}
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="department" className="text-sm font-medium">
          Department
        </label>
        <select
          id="department"
          value={department.inputValue}
          onChange={department.onChange}
          className="border rounded px-3 py-2 text-sm"
        >
          {departments.map((dept) => (
            <option key={dept.departmentName} value={dept.departmentName}>
              {dept.departmentName}
            </option>
          ))}
        </select>
        {department.error && <p className="text-red-500 text-xs">{department.error}</p>}
      </section>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 transition-colors"
      >
        Add Employee
      </button>
    </form>
  )
}