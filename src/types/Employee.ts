export interface Employee {
  firstName: string
  lastName: string
}

export interface Department {
  departmentName: string
  employees: Employee[]
}