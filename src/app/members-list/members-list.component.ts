import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/member';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  public members: Member[];

  constructor(
    private _dataService: DataService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._dataService.newMemberEmitter().subscribe(
      (event) => { this.getMembers() }
    )
    this._authService.Authorizate().then(
      (resolve) => {
        sessionStorage.setItem('auth_token',resolve.token);
        this.getMembers();
        this.initNextRefreshTimer();
      }
    )
  }

  getMembers(){
    this._dataService.getMembers().then(
      (resolve) => { this.members = resolve }
    );
  }

  initNextRefreshTimer(){
    let context = this;
    setTimeout(function(){
      context._dataService.refreshMembersList();
      context.initNextRefreshTimer();
    },120000)
  }
}
