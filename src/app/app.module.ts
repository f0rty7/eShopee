import { CategoryService } from './category.service';
import { AdminAuthGaurdService as AdminAuthGaurd } from './admin-auth-gaurd.service';
import { UserService } from './user.service';
import { AuthGaurdService as AuthGaurd } from './auth-gaurd.service';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule  } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { ProductFormComponent } from './admin/product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
//routes for anonymous users      
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },
//routes for logged in users
      { path: 'check-out', component: CheckoutComponent, canActivate: [AuthGaurd] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGaurd]  },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGaurd]  },
///routes for admins      
      { path: 'admin/products', component: AdminProductComponent, canActivate: [AuthGaurd, AdminAuthGaurd]  },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGaurd, AdminAuthGaurd]  },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGaurd, AdminAuthGaurd]  },
    ])
  ],
  providers: [
    AuthService,
    AuthGaurd,
    AdminAuthGaurd,
    UserService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
