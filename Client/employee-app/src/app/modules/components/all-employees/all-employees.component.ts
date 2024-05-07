import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from '../../models/Employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss'],
})
export class AllEmployeesComponent implements OnInit {
  employees: Employee[];
  activeEmployees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  dataSource = new MatTableDataSource<Employee>(this.filteredEmployees);
  @Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() updatedEmployee: EventEmitter<Employee> =
    new EventEmitter<Employee>();
  employeeForm: FormGroup;
  searchControl: FormControl = new FormControl('');
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateStartingWork',
    'idNumber',
    'actions',
  ];
  selectedEmployeeId: number | null = null;
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.fetchEmployees();
    this.filteredEmployees = this.activeEmployees;
    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }
  applyFilter(): void {
    const searchText = this.searchControl.value.toLowerCase().trim();
    if (!searchText) {
      this.filteredEmployees = this.activeEmployees;
      return;
    }
    this.filteredEmployees = this.activeEmployees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchText) ||
        employee.lastName.toLowerCase().includes(searchText) ||
        employee.dateStartingWork
          .toString()
          .toLowerCase()
          .includes(searchText) ||
        employee.idNumber.toLowerCase().includes(searchText),
    );
  }
  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.activeEmployees = this.filteredEmployees = this.employees.filter(
        (employee) => employee.isActive,
      );
      this.dataSource.data = this.filteredEmployees;
    });
  }

  deleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      console.log(`Employee with ID ${employeeId} deleted successfully.`);
      this.fetchEmployees();
    });
  }
  updateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      console.log(
        `Employee ${employee.firstName} ${employee.lastName} updated successfully.`,
      );
      this.fetchEmployees();
    });
  }
  openDialog(type: 'add' | 'edit', employee: Employee | null): void {
    let dialogRef;
    if (type === 'add') {
      dialogRef = this.dialog.open(AddEmployeeComponent, {
        width: 'auto',
      });
      dialogRef.componentInstance.addedEmployee.subscribe(() => {
        this.fetchEmployees();
      });
    } else if (type === 'edit' && employee) {
      this.selectedEmployeeId = employee.id;
      dialogRef = this.dialog.open(EditEmployeeComponent, {
        width: 'auto',
        data: { employee },
      });
      dialogRef.componentInstance.updatedEmployee.subscribe(
        (updatedEmployee: Employee) => {
          this.fetchEmployees();
        },
      );
    }
    dialogRef?.afterClosed().subscribe(() => {
      console.log(`The ${type} dialog was closed`);
    });
  }
  exportToExcel(): void {
    const exportData: any[] = this.filteredEmployees.map((employee) => {
      return {
        'First Name': employee.firstName,
        'Last Name': employee.lastName,
        'Start Date': employee.dateStartingWork,
        'ID Number': employee.idNumber,
      };
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    const excelBuffer: any = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });
    const fileName: string = 'employees.xlsx';
    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(blob, fileName);
  }
}
