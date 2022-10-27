import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAll(){
    return this.db.list('products').snapshotChanges()
    .pipe(
      map(cahnges => cahnges.map(
        (c: any)=> {
          return {key: c.payload.key, name: c.payload.val().name, price: c.payload.val().price}
        }
      ))
    );
  }

  create(product: any){
    return this.db.list('products/').push(product);
  }

  update(){

  }

  delete(){

  }
}
