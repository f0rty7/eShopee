import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular-4-data-table-fix';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit, OnDestroy {

  product: Product[];
  subscription: Subscription;
  filteredProducts: any[];
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) { }

  filter(query: string){
    // console.log(query);
    this.filteredProducts = (query) ?
    this.product.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.product
  }

  private initializeTable(product: Product[]){
    this.tableResource = new DataTableResource(product);
    this.tableResource.query({ offset: 0 })
      .then( items => this.items = items );
    this.tableResource.count()
      .then( count => this.itemCount = count );
  }

  reloadItems(params){
    if(!this.tableResource) return;

    this.tableResource.query(params)
      .then( items => this.items = items );  
  }

  ngOnInit() {
    this.subscription =this.productService.product$
    .subscribe( x => {
      this.filteredProducts = this.product = x;
      this.initializeTable(this.product);
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
