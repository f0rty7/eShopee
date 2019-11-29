import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
// import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: any[] = [];
  product = {} ;

  constructor(
    private categoryService: CategoryService,
    private db: AngularFireDatabase,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
      
      let id = this.route.snapshot.paramMap.get('id');
      if(id) this.productService.getProductID(id).valueChanges().subscribe(p => this.product = p);
  }

  save(product){
    this.productService.create(product);
    this.router.navigate(['/admin/products']);

  }

  ngOnInit() {
  this.categoryService.courses$
  .subscribe(x => {
    this.categories = x;
    })
  }
}
