import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Name, Role } from '../../models/Role.model';
import { MatTableDataSource } from '@angular/material/table';
import { roleNames } from '../../models/roleNamesArray';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.scss'],
})
export class AllRolesComponent implements OnInit {
  @Output() rolesUpdated: EventEmitter<Role[]> = new EventEmitter<Role[]>();
  @Input() roles: Role[];
  @Input() dateStartingWork: Date;
  dataSource: MatTableDataSource<Role>;
  showAddForm: boolean = false;
  showEditForm: boolean = false;
  roleNames: string[] = roleNames;
  selectedRole: any;
  displayedColumns: string[] = ['name', 'type', 'startDate', 'edit'];
  newRole: Role;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Role>([]);
    this.dataSource.data = this.roles;
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource<Role>([]);
  }

  handleFormSubmit({ role, isNew }: { role: Role; isNew: boolean }) {
    if (isNew) {
      const existingRole = this.roles.find((r) => r.name === role.name);
      if (!existingRole) {
        this.roles.push(role);
        this.snackBar.open('Role saved successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else {
        console.log('Role already exists.');
      }
    } else {
      const index = this.roles.findIndex((r) => r.id === role.id);
      if (index !== -1) {
        this.roles[index] = role;
      } else {
        console.error('Role not found for updating.');
      }
    }
    this.dataSource.data = this.roles;
    this.cdr.detectChanges();
    this.rolesUpdated.emit(this.roles);
    this.showEditForm = false;
    this.showAddForm = false;
  }
  handleShowEditForm(role: any) {
    this.selectedRole = role;
    this.showEditForm = true;
  }
  handleShowAddForm() {
    this.newRole = new Role(0, Name.Lecturer, false, new Date());
    this.showAddForm = !this.showAddForm;
  }
}
