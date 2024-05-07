import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Employee, Gender } from '../../models/Employee.model';
import { Role } from '../../models/Role.model';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  @Output() employeeUpdated: EventEmitter<Employee> =
    new EventEmitter<Employee>();
  @Input() employee?: Employee;
  @Output() formSubmit: EventEmitter<{ employee: Employee; isNew: boolean }> =
    new EventEmitter<{ employee: Employee; isNew: boolean }>();
  @Output() saveRoles: EventEmitter<Role[]> = new EventEmitter<Role[]>();
  employeeForm: FormGroup;
  showEmployeeForm: boolean = true;
  rolesToAdd: Role[];
  constructor(private formBuilder: FormBuilder) {}
  new: boolean;
  ngOnInit(): void {
    if (!this.employee) {
      this.new = true;
      this.employee = {
        id: 0,
        firstName: '',
        lastName: '',
        idNumber: '',
        isActive: false,
        dateStartingWork: new Date(),
        dateOfBirth: new Date(),
        gender: Gender.Male,
        roles: [],
      };
    }
    const maxDateOfBirthValidator = (maxDate: Date) => {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const inputDate = new Date(control.value);
        return inputDate > maxDate ? { maxDateOfBirth: true } : null;
      };
    };
    const maximumDateOfBirth = new Date();
    maximumDateOfBirth.setFullYear(maximumDateOfBirth.getFullYear() - 16);
    this.employeeForm = this.formBuilder.group({
      firstName: [
        this.employee.firstName,
        [Validators.required, Validators.pattern(/^[^\d]+$/)],
      ],
      lastName: [
        this.employee.lastName,
        [Validators.required, Validators.pattern(/^[^\d]+$/)],
      ],
      idNumber: [
        this.employee.idNumber,
        [Validators.required, Validators.pattern('^[0-9]{9}$')],
      ],
      isActive: [this.employee.isActive],
      dateStartingWork: [this.employee.dateStartingWork, Validators.required],
      dateOfBirth: [
        this.employee.dateOfBirth,
        [Validators.required, maxDateOfBirthValidator(maximumDateOfBirth)],
      ],
      gender: [this.employee.gender, Validators.required],
      roles: [this.employee.roles],
    });
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }
  handleShowRoles() {
    this.showEmployeeForm = false;
  }
  handleShowEmployeeForm() {
    this.showEmployeeForm = true;
  }
  rolesStartDateValidator(
    dateStartingWorkControl: AbstractControl,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!dateStartingWorkControl || !dateStartingWorkControl.value) {
        return null;
      }
      const roles = control.value;
      if (!Array.isArray(roles)) {
        return null;
      }
      const invalidRoles = roles.filter(
        (role) => role.startDate < dateStartingWorkControl.value,
      );
      return invalidRoles.length > 0 ? { invalidStartDate: true } : null;
    };
  }
  onSubmit() {
    if (this.employeeForm.invalid) {
      console.log('invalid ', this.employeeForm.value);
      return;
    }
    const dateStartingWorkControl = this.employeeForm?.get('dateStartingWork');
    const rolesControl = this.employeeForm?.get('roles');
    if (dateStartingWorkControl && rolesControl) {
      rolesControl.setValidators(
        this.rolesStartDateValidator(dateStartingWorkControl),
      );
      rolesControl.updateValueAndValidity();
    }
    if (
      !this.employeeForm.value.roles ||
      this.employeeForm.value.roles.length === 0
    ) {
      return;
    }
    const updatedEmployee: Employee = {
      ...this.employee,
      ...this.employeeForm.value,
      isActive: this.employeeForm.value.isActive ? true : false,
      gender: this.employeeForm.value.gender == 'Male' ? 0 : 1,
      roles: this.employeeForm.value.roles,
    };
    this.formSubmit.emit({ employee: updatedEmployee, isNew: this.new });
  }
  onSaveRoles(roles: Role[]) {
    this.employeeForm.value.roles = roles;
  }
}
