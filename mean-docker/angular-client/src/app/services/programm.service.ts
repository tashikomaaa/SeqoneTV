import { Injectable } from '@angular/core';
import { Http } from '@angular/http';



@Injectable()
export class ProgrammService {
    programms: any[] = []
    API = 'http://localhost:300';

    constructor(private http: Http){ }
    //Get All programm
    getAllProgramm() {
        this.http.get(`${this.API}/`, {})
            .map(res => res.json())
            .subscribe(programm => {
                //this.programms = programm
                this.programms = programm.items
                //console.log(this.programms)
            })
            
    }

}