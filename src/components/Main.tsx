import type { Department } from "../types/Employee"

function Main({ departments }: { departments: Department[] }) {
  return (
    <main id="employee-list">
      {departments.map((department) => (
        <div key={department.departmentName}>
          <h3>{department.departmentName}</h3>
          <ul>
            {department.employees.map((emp, index) => (
              <li key={`${emp.firstName}-${emp.lastName}-${index}`}>
                {emp.firstName} {emp.lastName}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  )
}

export default Main