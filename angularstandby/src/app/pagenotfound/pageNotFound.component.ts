import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './pageNotFound.component.html',
    styleUrls: ['./pageNotFound.component.css']
})
export class PageNotFoundComponent implements OnInit {

    title: 'page not found Error 404';
    API: 'http://localhost:3000';

    constructor( private http: Http){}

    ngOnInit(){

    }

    

}