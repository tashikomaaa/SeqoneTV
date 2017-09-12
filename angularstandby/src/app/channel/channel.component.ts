import { Component, OnInit } from '@angular/core';
//import { ProgrammService } from '../services/programm.service';
import { Http } from '@angular/http';

// Import rxjs map operator
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './channel.component.html',
    styleUrls: ['./channel.component.css'],
})
export class ChannelComponent implements OnInit {
    title = 'app works!';

    // Link to our api, pointing to localhost
    API = 'http://localhost:3000';

    // Declare empty list of people
    people: any[] = [];

    // Declare empty list of programm
    programms: any[] = [];
    channel: any[] = [];
    keysArray: any[] = [];

    constructor(/*private programmService: ProgrammService,*/ private http: Http) { }


    //Get channel info
    getChannelInfo(){
        this.http.get(`${this.API}/channel`, { })
            .map(res => res.json())
            .subscribe(channel => {
                this.channel = channel;
            })
    }

    //Get All programm
    getAllProgrammOfChannel() {
        this.http.get(`${this.API}/channelProg`, { })
            .map(res => res.json())
            .subscribe(programm => {
                this.programms = programm
            })
    }

    ngOnInit() {
        this.getAllProgrammOfChannel();
        this.getChannelInfo();
    }

}