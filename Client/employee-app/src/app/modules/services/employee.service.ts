import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Employee } from '../models/Employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://localhost:7191/api';
  getEmployees(): Observable<Employee[]> {
    console.log('/api/Employee');
    return this.http.get<Employee[]>(`${this.baseUrl}/Employee`);
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/Employee`, employee).pipe(
      tap(() => {
        console.log('Employee added successfully');
      }),
      catchError((error) => {
        console.error('Error adding employee:', error);
        throw error;
      }),
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/Employee/${employee.id}`;
    return this.http
      .put<Employee>(url, employee)
      .pipe(
        tap((updatedEmployee) =>
          console.log('Employee updated successfully:', updatedEmployee),
        ),
      );
  }
  deleteEmployee(id: number): Observable<void> {
    const url = `${this.baseUrl}/Employee/${id}`;
    return this.http.delete<void>(url);
  }
}
