import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemsByCategoryComponent } from './items-by-category/items-by-category.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { PromotionComponent } from './promotion/promotion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DailyIncomeResolver } from './resolvers/daily-income.resolver';
import { DailyOrdersResolver } from './resolvers/daily-orders.resolver';
import { ItemsSoldByCategoryResolver } from './resolvers/items-sold-by-category.resolver';
import { ItemsSoldCounterResolver } from './resolvers/items-sold-counter.resolver';
import { NewItemComponent } from './new-item/new-item.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'item-details', component: ItemDetailsComponent},
  {path: 'items-by-category', component: ItemsByCategoryComponent},
  {path: 'cart', component: CartComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'promotion', component: PromotionComponent},
  {path: 'dashboard', component: DashboardComponent, resolve: {
    itemsSoldByCategory : ItemsSoldByCategoryResolver,
    itemsSoldCounter : ItemsSoldCounterResolver,
    dailyIncome : DailyIncomeResolver,
    dailyOrders : DailyOrdersResolver
}},
{path: 'new-item', component: NewItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
