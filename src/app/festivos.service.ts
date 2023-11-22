import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { festivos } from './festivos';


@Injectable({ providedIn: 'root' })
export class festivosService {

  private festivosUrl = 'http://127.0.0.1:8080/festivos/verificar';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getfestivo(fecha: string): Observable<string> {
      const url = `${this.festivosUrl}/${fecha}`;
      return this.http.get(url, {responseType: 'text'}) 
        .pipe(
          tap(_ => this.log(`fetched festivos for date ${fecha}`)),
          catchError(this.handleError<string>('getfestivo')) 
        );
    }
 
      getfestivos(ano: number): Observable<festivos[]> {
        const url = `${this.festivosUrl}/obtener/${ano}`;
        return this.http.get<festivos[]>(url).pipe(
          tap(_ => this.log(`fetched festivos for year ${ano}`)),
          catchError(this.handleError<festivos[]>(`getfestivos`, []))
        );
      }
    

 

  

  /**
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`festivosService: ${message}`);
  }
}