import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AllEmployeesComponent } from './modules/components/all-employees/all-employees.component';
// import { EmployeeDetailsComponent } from './modules/components/employee-details/employee-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AddEmployeeComponent } from './modules/components/add-employee/add-employee.component';

import { EmployeeFormComponent } from './modules/components/employee-form/employee-form.component';
import { AllRolesComponent } from './modules/components/all-roles/all-roles.component';
import { RoleFormComponent } from './modules/components/role-form/role-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditEmployeeComponent } from './modules/components/edit-employee/edit-employee.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    AllEmployeesComponent,
    // EmployeeDetailsComponent,
    AddEmployeeComponent,
    EmployeeFormComponent,

    AllRolesComponent,
    RoleFormComponent,
    EditEmployeeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,

    BrowserAnimationsModule,
    // MatDatepickerModule,

    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatOption,
    MatIconModule,
    RouterModule.forRoot([
      { path: 'employees', component: AllEmployeesComponent },
    ]),
  ],
  providers: [DatePipe, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
