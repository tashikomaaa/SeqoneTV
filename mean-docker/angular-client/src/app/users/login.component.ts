import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './login.component.html',
    styleUrls: ['./users.component.css']
})
export class LoginComponent implements OnInit {
    title: 'Login';
    API: 'http://localhost:30000';

    constructor(private http: Http){};
    
    ngOnInit(){}

    connectUsers(name, email, passwd){
        console.log('Connection users call');
    this.http.post(`${this.API}/users`, {name, email, passwd})
        .map(res => res.json())
        .subscribe(() => {
            console.log('conexion users');
        })
    }
}