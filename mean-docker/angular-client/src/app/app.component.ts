import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of people
  people: any[] = [];

  // Declare empty list of programm
  programms: any[] = [];
  keysArray: any[] = [];

  constructor(private http: Http) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllProgramm();
  }

  //Get All programm
  getAllProgramm(){
    this.http.get(`${this.API}/`, {})
      .map(res => res.json())
      .subscribe(programm => {
        //this.programms = programm
        this.programms = programm['items']
        console.log(this.programms)
      })
  }

  // Add one person to the API
  addPerson(name, age) {
    this.http.get(`${this.API}/users`)
      .map(res => res.json())
      .subscribe(() => {
        this.getAllPeople();
      })
  }

  // Get all users from the API
  getAllPeople() {
    this.http.get(`${this.API}/users`)
      .map(res => res.json())
      .subscribe(people => {
        console.log(people)
        this.people = people
      })
  }
}