import { Component, OnInit } from '@angular/core';
//import { ProgrammService } from '../services/programm.service';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    title = 'app works!';

    // Link to our api, pointing to localhost
    API = 'http://localhost:3000';

    // Declare empty list of people
    people: any[] = [];

    // Declare empty list of programm
    programms: any[] = [];
    channels = [];
    tweets: any[] = [];
    keysArray: any[] = [];

    constructor(/*private programmService: ProgrammService,*/ private http: Http) { }

    //Get All programm
    getAllProgramm() {

        this.http.get(`${this.API}/getChannel`, {})
            .map(res => res.json())
            .subscribe(channel => {
                this.channels = channel;
                console.log(this.channels)
                
            }) 
        

        this.http.get(`${this.API}/tweets`, {})
            .map(res => res.json())
            .subscribe(tweet => {

                this.tweets = tweet;
            }) 
    }

    ngOnInit() {
        this.getAllProgramm();
    }

}