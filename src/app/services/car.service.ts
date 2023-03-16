import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Car } from '../models/car';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'http://localhost:3000/cars'; // api rest fake

constructor(private httpClient: HttpClient) {}

  httpOptions = { // Headers
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCars(): Observable<Car[]> { // retorna todos os carros
    return this.httpClient.get<Car[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
        )
  }

  getCarById(id: number): Observable<Car> { // retorna os carros pelo id
    return this.httpClient.get<Car>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveCar(car:Car): Observable<Car> { // salva um campo de carro
    return this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateCar(car: Car): Observable<Car> { // atualiza o campo de carro
    return this.httpClient.put<Car>(this.url + '/' + JSON.stringify(car), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteCar(car: Car){ // deleta um campo de carro
    return this.httpClient.put<Car>(this.url + '/' + car.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) { // manipula os erros
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage  = error.error.message // Erro no lado do client
    } else {
      errorMessage = `Código do erro: ${error.status},` +  `messagem: ${error.message}`; // Erro no lado do servidor
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
