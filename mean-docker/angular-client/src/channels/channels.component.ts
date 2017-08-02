import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// Import rxjs map operotor
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.css']
})
export class ChannelComponent implements OnInit {
    title = 'channels page';

    API = 'http://localhost:3000';

    channels: any[] = [];

    constructor(private http: Http) {}

    ngOnInit(){
        this.getChannels();
    }

    //get all channels
    getChannels(){
        this.http.get(`${this.API}/channels`)
        .map(res => res.json())
        .subscribe(channel => {
            console.log(channel)
            this.channels = channel
        })
    }
}