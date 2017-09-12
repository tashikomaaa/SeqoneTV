import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    title = 'Login / Inscription';

    //API url
    API = 'http://localhost:300';

    constructor(private http: Http){};

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    
  }

  // Add one person to the API
  addPerson(name, email, passwd, passConfirm) {
    console.log('add user')
    this.http.post(`${this.API}/users`, {name, email, passwd, passConfirm})
      .map(res => res.json())
      .subscribe(() => {
        console.log('users')
      })
  }

}