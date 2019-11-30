import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../product.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
// import 'rxjs/add/operator/take';

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories: any[] = [];
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private db: AngularFireDatabase,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  save(product) {
    if (this.id) this.productService.updateProduct(this.id, product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this product ?')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(["/admin/products"]);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .getProductID(this.id)
        .valueChanges()
        .subscribe(p => (this.product = p));
    this.categoryService.courses$.subscribe(x => {
      this.categories = x;
    });
  }
}
