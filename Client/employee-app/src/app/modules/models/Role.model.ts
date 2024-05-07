import { Employee } from './Employee.model';
export enum Name {
  Lecturer,
  Developer,
  Bookeeper,
  Designer,
}

export class Role {
  id: number;
  name: Name;
  isAdministrative: boolean;
  startDate: Date;
  constructor(
    id: number,
    name: Name,
    isAdministrative: boolean,
    startDate: Date,
  ) {
    this.id = id;
    this.name = name;
    this.isAdministrative = isAdministrative;
    this.startDate = startDate;
  }
}
