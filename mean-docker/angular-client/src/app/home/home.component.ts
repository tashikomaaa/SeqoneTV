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
    tweets: any[] = [];
    keysArray: any[] = [];

    constructor(/*private programmService: ProgrammService,*/ private http: Http) { }

    //   getProgramms(): void{
    //       this.programmService.getAllProgramm();
    //     //   console.log(this.programmService.programms
    //       this.programms = this.programmService.programms
    //   }

    //Get All programm
    getAllProgramm() {
        this.http.get(`${this.API}/getProgs`, {})
            .map(res => res.json())
            .subscribe(programm => {
                console.log(programm)
                this.programms = programm
                console.log(this.programms)
            }) 

        this.http.get(`${this.API}/tweets`, {})
            .map(res => res.json())
            .subscribe(tweet => {
                console.log(tweet)
                this.tweets = tweet;
            }) 
    }

    ngOnInit() {
        this.getAllProgramm();
    }

}