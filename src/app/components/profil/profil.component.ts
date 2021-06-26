import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  name = 'jhon doe';

  constructor() { }

  ngOnInit(): void {
  }

}
