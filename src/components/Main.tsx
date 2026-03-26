import type { Department } from '../types/Employee'
import employeeData from '../data/employees.json'

function Main() {
  const departments: Department[] = employeeData

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