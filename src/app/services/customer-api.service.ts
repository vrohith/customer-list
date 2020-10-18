import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ICustomer } from '../customer';
import { Observable, of } from 'rxjs';
import { catchError, tap, retry } from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  public customerUrl = 'api/customers';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customerUrl)
  }

  getCustomerbyId(id: number): Observable<ICustomer> {
    const url = `${this.customerUrl}/${id}`;
    return this.http.get<ICustomer>(url);
  }

  addCustomer (customer : ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.customerUrl, customer);
  }

  deleteCustomer(customer: ICustomer | number): Observable<ICustomer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customerUrl}/${id}`;

    return this.http.delete<ICustomer>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Customer id=${id}`)),
      catchError(this.handleError<ICustomer>('deleteCustomer'))
    );
  }

  updateCustomer(customer: ICustomer): Observable<any> {
    return this.http.put(this.customerUrl, customer, this.httpOptions).pipe(
      tap(_ => console.log(`updated customer id=${customer.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

