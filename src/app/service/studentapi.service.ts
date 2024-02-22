import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentapiService {
    httpLink: string = 'http://localhost:3000/eblastudent'

    constructor(private _http: HttpClient) { }
    
    addStudent(data: any): Observable<any> {
        return this._http.post(this.httpLink, data);
    }
    getAllStudent(): Observable<any> {
        return this._http.get(this.httpLink);
    }
    deleteById(id:number):Observable<any>{
        return this._http.delete(this.httpLink+"/"+id)
    }

    updatebyID(id:number,data:any):Observable<any>{
        return this._http.put(this.httpLink+"/"+id, data)
    }
}
        
