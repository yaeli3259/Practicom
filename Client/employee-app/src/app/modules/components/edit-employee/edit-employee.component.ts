import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Employee, Gender } from '../../models/Employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent {
  employee: Employee;
  @Output() updatedEmployee: EventEmitter<Employee> =
    new EventEmitter<Employee>();

  constructor(
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.employee = { ...this.data.employee };
  }

  handleFormSubmit({
    employee,
    isNew,
  }: {
    employee: Employee;
    isNew: boolean;
  }) {
    this.employee = { ...this.employee, ...employee };
    if (!isNew) {
      this.employeeService.updateEmployee(employee).subscribe(
        (updatedEmployee) => {
          console.log('Employee updated successfully:', updatedEmployee);
          this.updatedEmployee.emit(updatedEmployee);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating employee:', error);
        },
      );
    }
  }
}
