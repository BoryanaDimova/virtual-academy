import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/models/user.interface';
import {UserService} from '../../services/user.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  editDisabled = true;
  users: User[];
  destroy$ = new Subject<boolean>();

  constructor(private userService: UserService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getUsers() {
    this.userService.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }

  onBlockClick(bannedUser: User) {
    bannedUser.isBlocked = true;
    this.userService.saveUser(bannedUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onDeleteClick(id: number) {
    this.userService.deleteUser(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>
      this.getUsers()
    );
  }

  editRow(user: User) {
    this.buildForm(user);
    this.editDisabled = false;
  }

  updateEdit() {
    const userData = this.formGroup.value;
    this.userService.saveUser(userData)
      .subscribe((response) => {
        this.getUsers();
        this.cancelEdit();
      }, err => {
        this.cancelEdit();
      });
  }

  cancelEdit() {
    // @ts-ignore
    if (this.users.filter(u => u.id === 0).length > 0) {
      this.users.pop();
    }
    // cancel
    this.buildForm();
    this.editDisabled = true;
  }

  private buildForm(user?: User): void {

    this.formGroup = this.fb.group({
      id: user ? user.id : 0,
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : '',
      password: user ? user.password : '',
      isBlocked: user ? user.isBlocked : false,
      isAdmin: user ? user.isAdmin : false
    });
  }

  addNewUser(){
    if (this.users.filter(u => u.id === 0).length > 0){
      return;
    }
    const newUser = {
      id: 0,
      email: '',
      firstName: '',
      isAdmin: false,
      isBlocked: false,
      lastName: '',
      password: ''
    };
    this.users.push(newUser);
    this.buildForm(newUser);
    this.editDisabled = false;
  }
}
