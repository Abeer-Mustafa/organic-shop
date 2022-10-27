import { ProductService } from './../../../services/product.service';
import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild  } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';
import { Product } from '../../../interfaces/product';

import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, OnInit {
  // @ViewChild(DataTableDirective, {static: false})

  products: Product[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  // dtElement?: DataTableDirective;

  displayTable: boolean = false;

  constructor(
    private proService: ProductService,
    private db: AngularFireDatabase
  ) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true
    };
    this.proService.getAll()
      .subscribe(data => {
        this.products = data;
        this.dtTrigger.next(true);
        this.displayTable = true;
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
