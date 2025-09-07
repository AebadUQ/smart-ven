export interface Student {
  id: string;
  fullname: string;
  gender: string;
  grade: string;
  status: string;
  age: number;
  dob: string;
  parentId: string;
  schoolId: string;
  vanId: string;
}

export interface Parent {
  id: string;
  fullname: string;
  email: string;
  phoneNo: string;
  address: string;
  image: string;
}

export interface Van {
  id: string | null;
  carNumber: string;
  vehicleType: string;
}

export interface Driver {
  id: string | null;
  fullname: string;
  email: string;
  phoneNo: string;
}

export interface StudentRecord {
  student: Student;
  parent: Parent;
  van: Van;
  driver: Driver;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StudentState {
  students: StudentRecord[];
  pagination: PaginationMeta;
  loading: boolean;
  error: string | null;
}
