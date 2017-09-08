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
  title = "SeqoneTV";
  API = "http://localhost:3000";
  channels: any[] = [];

  constructor( private http: Http){}
    //Get All programm
    getAllProgramm() {
      
              this.http.get(`${this.API}/getChannel`, {})
                  .map(res => res.json())
                  .subscribe(channel => {
                      this.channels = channel;
                      console.log(this.channels)
                      
                  }) 
          }
      
          ngOnInit() {
              this.getAllProgramm();
          }
}