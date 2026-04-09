export interface Employee {
  firstName: string
  lastName: string
}

export interface Department {
  departmentName: string
  employees: Employee[]
}

export interface Leadership {
  firstName: string
  lastName: string
  role: string
}