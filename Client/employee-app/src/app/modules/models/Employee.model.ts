import { Role } from './Role.model';
export enum Gender {
  Male,
  Female,
}
export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  isActive: boolean;
  dateStartingWork: Date;
  dateOfBirth: Date;
  gender: Gender;
  roles: Role[];
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    idNumber: string,
    isActive: boolean,
    dateStartingWork: Date,
    dateOfBirth: Date,
    gender: Gender,
    roles: Role[],
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.isActive = isActive;
    this.dateStartingWork = dateStartingWork;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.roles = roles;
  }
}
