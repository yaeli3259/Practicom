import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Name, Role } from '../../models/Role.model';
import { roleNames } from '../../models/roleNamesArray';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent implements OnInit {
  @Input() role?: Role;
  @Input() dateStartingWork: Date;
  @Output() formSubmit: EventEmitter<{ role: Role; isNew: boolean }> =
    new EventEmitter<{ role: Role; isNew: boolean }>();
  roleForm: FormGroup;
  roleNames: string[] = roleNames;
  new: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (!this.role) this.new = true;

    this.roleForm = this.formBuilder.group({
      name: [this.role ? this.role.name : '', Validators.required],
      startDate: [this.role ? this.role.startDate : '', Validators.required],
      isAdministrative: [this.role ? this.role.isAdministrative : false],
    });
    if (this.role) {
      this.roleForm.patchValue(this.role);
    }
  }
  onSubmit() {
    const name = this.roleNames.indexOf(this.roleForm.value.name);
    if (this.roleForm.invalid || (name == -1 && !this.role)) {
      console.log('invalid ROLE');
      return;
    }
    const updateRole: Role = {
      ...this.role,
      ...this.roleForm.value,
      isAdministrative: this.roleForm.value.isAdministrative ? true : false,
      name: name == -1 ? this.role?.name : name,
    };
    console.log('the updated role: ', updateRole);
    this.formSubmit.emit({ role: updateRole, isNew: this.new });
  }
}
