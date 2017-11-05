import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class SearchService {

    constructor(
        private http: Http
    ){}

    searchParents(pkg) {
        return new Promise(resolve => {
            this.http.post('http://dayshare-es-env.atxmwjr3te.us-east-2.elasticbeanstalk.com/api/searchParents', pkg)
                .subscribe( res => resolve(res.json().data))
        })
    }

}