import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverAddress: string = 'https://nettuts.hu/jms/antarn88/products';

  productsList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.productsList$.next([]);
    this.http.get<Product[]>(this.serverAddress).subscribe(
      productsList => this.productsList$.next(productsList),
      error => console.error(error)
    );
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.serverAddress}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.serverAddress}/${product.id}`, product);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.serverAddress, product);
  }

  remove(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.serverAddress}/${id}`);
  }

}
