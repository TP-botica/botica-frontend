import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'contact-us', component:ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
