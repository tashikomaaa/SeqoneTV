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
  color: string;
  // Link to our api, pointing to localhost
  API = 'http://localhost:3000';

  // Declare empty list of channels
  channels: any[] = [];

  constructor(private http: Http) {}

  // Angular 2 Life Cycle event when component has been initialized
  ngOnInit() {
    this.getAllChannel();
  }

  // Add one person to the API
  // Get all channels from the API
  getAllChannel() {
    this.http.get(`${this.API}/channels`)
      .map(res => res.json())
      .subscribe(channel => {
        console.log(channel)
        this.channels = channel
      })
  }
}