export interface Employee {
  empNumber: number;
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  terminationId: string | null;
}

export interface UserRole {
  id: number;
  name: string;
  displayName: string;
}

export interface UserRecord {
  id: number;
  userName: string;
  deleted: boolean;
  status: boolean;
  employee: Employee;
  userRole: UserRole;
}