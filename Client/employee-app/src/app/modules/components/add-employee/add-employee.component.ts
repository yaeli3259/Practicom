import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Employee, Gender } from '../../models/Employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  @Output() addedEmployee: EventEmitter<Employee> =
    new EventEmitter<Employee>();

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private employeeService: EmployeeService,
  ) {}
  newEmployee: Employee;
  ngOnInit(): void {
    this.newEmployee = new Employee(0,'','','',false,new Date(),new Date(),Gender.Male,[],);}
  handleFormSubmit({
    employee,
    isNew,
  }: {
    employee: Employee;
    isNew: boolean;
  }) {
    this.newEmployee = { ...this.newEmployee, ...employee };
    if (isNew) {
      Swal.fire({
        title: 'Processing...',
        html: '<i class="fas fa-spinner fa-spin"></i>',
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      this.employeeService.addEmployee(employee).subscribe(
        (addedEmployee) => {
          console.log('Employee added successfully:', addedEmployee);
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Employee Added Successfully!',
            showConfirmButton: false,
            timer: 2000,
          });

          this.addedEmployee.emit(addedEmployee);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error adding employee:', error);
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add employee. Please try again later.',
            confirmButtonText: 'OK',
          });
        },
      );
    }
  }
}
