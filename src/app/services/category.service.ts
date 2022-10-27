import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){

    return this.db.list('categories').snapshotChanges()
    .pipe(
      map(cahnges => cahnges.map(
        (c: any)=> {
          return {key: c.payload.key, name: c.payload.val().name}
        }
      ))
    );
  }
}
