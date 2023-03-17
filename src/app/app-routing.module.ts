import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumptionsComponent } from './consumptions/consumptions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenuesComponent } from './revenues/revenues.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
    },
    {
        path: 'consumptions',
        component: ConsumptionsComponent,
    },
    { path: 'revenues', component: RevenuesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
