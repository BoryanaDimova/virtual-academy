import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/models/user.interface';
import {UserService} from '../../services/user.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy {

  users: User[];
  isEditable: boolean;
  destroy$ = new Subject<boolean>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getUsers(){
    this.userService.getUsers().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.users = response;
    }, error => {
      console.log(error);
    });
  }

  onBlockClick(id: number){
    const bannedUser: User = this.users.find((u: User) => u.id = id);
    bannedUser.isBlocked = true;
    this.userService.saveUser(bannedUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onDeleteClick(id: number){
    this.userService.deleteUser(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
