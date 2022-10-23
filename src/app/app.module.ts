import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { observeInsideAngular } from '@angular/fire/zones';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from '../environments/environment';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShoppingCartComponent,
    ProfileComponent,
    HomeComponent,
    CheckoutComponent,
    ProductsComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},

      {path: 'check-out', component: CheckoutComponent, canActivate: [AuthGuard]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},

      // admin routes
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard]},

      {path: 'login', component: LoginComponent, canActivate: []},
    ])
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
