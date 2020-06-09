import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseURL="https://routeegypt.herokuapp.com/"
token
  constructor(private _HttpClient: HttpClient) { 
this.token=localStorage.getItem('TOKEN')
  }


  getUserNotes(data): Observable<any> {
    
    return this._HttpClient.post(this.baseURL+'getUserNotes',data)
  }

  addNote(data):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'addNote',data)
  }


  deleteNote(data):Observable<any>
  {
    let options={
      headers:new HttpHeaders({
            'Content-Type':'application/json'
      }),
      body:
      {
        NoteID:data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.baseURL+'deleteNote',options)
  }

editNote(data):Observable<any>
{
  return this._HttpClient.put(this.baseURL+"updateNote",data)
}


}
