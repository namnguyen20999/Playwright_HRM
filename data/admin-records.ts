export interface AdminRecords {
  username?: string;
  userRole?: string;
  employeeName?: string;
  status?: string;

  [key: string]: string | undefined;
}

export const adminRecords: AdminRecords[] = [
  { username: 'Admin', userRole: 'Admin', status: 'Enabled' },
]