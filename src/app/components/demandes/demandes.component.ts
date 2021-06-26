import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.scss']
})
export class DemandesComponent implements OnInit {

  constructor(private userService:UserService) { }
userList : any[] = [];
  ngOnInit(): void {
    this.userService.retrieveAllUsers().subscribe((data:any)=> {
      this.userList = [...data];
    })
  }

}
