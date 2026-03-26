import { useState } from "react"
import type { Department, Employee } from "../../types/Employee"

interface AddEmployee {
    departments: Department[]
    onAddEmployee: (employee: Employee, departmentName: string) => void
    validationMessage: string
}

export default function AddEmployeeToList({
    departments,
    onAddEmployee,
    validationMessage,
}: AddEmployee) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [department, setDepartment] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newEmployee: Employee = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        }

        onAddEmployee(newEmployee, department)

        setFirstName('')
        setLastName('')
        setDepartment('')
    
    }

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded">
      <h2 className="text-lg font-semibold">Add New Employee</h2>

      {validationMessage && (
        <p className="text-red-500 text-sm">{validationMessage}</p>
      )}

      <section className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Jane"
          className="border rounded px-3 py-2 text-sm"
        />
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Smith"
          className="border rounded px-3 py-2 text-sm"
        />
      </section>

      <section className="flex flex-col gap-1">
        <label htmlFor="department" className="text-sm font-medium">
          Department
        </label>
        <select
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">Select a department...</option>
          {departments.map((dept) => (
            <option key={dept.departmentName} value={dept.departmentName}>
              {dept.departmentName}
            </option>
          ))}
        </select>
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