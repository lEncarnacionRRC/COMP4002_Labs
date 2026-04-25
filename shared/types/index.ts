export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  departmentId?: string;
}

export interface Department {
  id?: string;
  departmentName?: string;
  description?: string;
  employees?: Employee[];
}

export interface Leadership {
  id?: string;
  role: string;
  firstName: string;
  lastName: string;
}
