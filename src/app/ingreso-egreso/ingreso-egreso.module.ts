import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { StoreModule } from '@ngrx/store';


import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';


@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    HighchartsChartModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer)  
  ]
})
export class IngresoEgresoModule { }
