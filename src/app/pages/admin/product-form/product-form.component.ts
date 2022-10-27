import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../../../interfaces/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any>;

  constructor(
    private proService: ProductService,
    private catService: CategoryService) { 
    this.categories$ = this.catService.getCategories();
  }

  ngOnInit(): void {
  }

  save(product: any){
    this.proService.create(product);
  }

}
