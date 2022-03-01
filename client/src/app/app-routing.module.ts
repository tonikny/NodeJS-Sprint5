import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaComponent } from './sala/sala.component';

const routes: Routes = [
  { path: 'sala', component: SalaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
