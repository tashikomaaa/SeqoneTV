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
  title = 'SeqoneTV';
  API = 'http://localhost:3000';
  channels: any[] = [];
  channelsProg: any[] = [];

  constructor(private http: Http) { }

  //Get All channels
  getChannel() {

    this.http.get(`${this.API}/getChannel`, {})
      .map(res => res.json())
      .subscribe(channel => {
        this.channels = channel;

        console.log(this.channels)
      })

  }

  //get channel progs
  getChannelProgs() {
    this.http.get(`${this.API}/getChannelProg`, {})
      .map(res => res.json())
      .subscribe(progs => {
        this.channels = progs;
        this.channelsProg = progs;
      })
  }

  ngOnInit() {
/*     this.getChannel();
 */    this.getChannelProgs();

    // twitter Stream
    !function (d, s, id) {
      var js: any,
        fjs = d.getElementsByTagName(s)[0],
        p = 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + "://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    }
      (document, "script", "twitter-wjs");
  }
}
