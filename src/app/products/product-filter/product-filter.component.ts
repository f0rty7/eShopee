import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  productCategories: any = [];
  @Input('category') category;

  constructor(
    categoryService: CategoryService) { 
    categoryService.courses$.subscribe( y => this.productCategories = y);
  }

  ngOnInit() {
  }

}
