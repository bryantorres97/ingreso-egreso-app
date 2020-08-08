import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';

import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;
  numeroIngresos: number;
  numeroEgresos: number;
  suscripcion: Subscription = new Subscription();
  
 // Doughnut
 public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
 public doughnutChartData: MultiDataSet = [
   [350, 450, 100],
   [50, 150, 120],
   [250, 130, 70],
 ];
 public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {}


  ngOnInit(): void {
    this.suscripcion = this.store
      .select('ingresoEgreso')
      .subscribe((ingresoEgreso) => {
        this.contarIngresosEgresos(ingresoEgreso.items);
      });
  }

  contarIngresosEgresos(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.numeroEgresos = 0;
    this.numeroIngresos = 0;
    items.forEach((item) => {
      if (item.tipo === 'ingreso') {
        this.ingresos += item.monto;
        this.numeroIngresos++;
      } else {
        this.egresos += item.monto;
        this.numeroEgresos++;
      }
    });
  }
}
