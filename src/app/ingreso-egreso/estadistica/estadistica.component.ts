import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import * as Highcharts from 'highcharts';


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
  
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = { };


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

    this.chartOptions = {
      title : {
        text: 'Gráfico de ingresos y egresos'   
     },
      series : [{
        type: 'pie',
        name: 'Cantidad $',
        data: [
           ['Ingresos', this.ingresos],
           ['Egresos', this.egresos]      
        
        ]
     }]
    }
  }
}
