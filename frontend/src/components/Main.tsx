import type { Department } from "../types/Employee"
import "./employees/AddEmployeeToList.css"

function Main({ departments }: { departments: Department[] }) {
  return (
    <main id="employee-list">
      {departments.map((department) => (
        (department.employees || []).map((emp, index) => (
          <div key={`${emp.firstName}-${emp.lastName}-${index}`} className="employee-item">
            <div className="employee-name">
              {emp.firstName} {emp.lastName}
            </div>
            <div className="employee-department">
              {department.departmentName}
            </div>
          </div>
        ))
      ))}
    </main>
  )
}

export default Main