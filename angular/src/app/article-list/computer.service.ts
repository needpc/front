import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Computer } from './computer';

@Injectable()
export class ComputerService {
    url = "https://127.0.0.1:4433/api/v1/search/computers/";
    constructor(private http:Http) { }
    getComputersWithObservable(): Observable<Computer[]> {
        return this.http.get(this.url)
	        .map(this.extractData)
	        .catch(this.handleErrorObservable);
    }
    getComputersWithPromise(): Promise<Computer[]> {
        return this.http.get(this.url).toPromise()
	    .then(this.extractData)
	    .catch(this.handleErrorPromise);
    }
    private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }
    private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
    }
}
