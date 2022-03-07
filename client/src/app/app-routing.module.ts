import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './sala/sala.component';
import { XatComponent } from './xat/xat.component';

const routes: Routes = [
  { path: 'sala', component: SalaComponent },
  { path: 'sales', component: SalaComponent },
  { path: 'xat/:id', component: XatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
