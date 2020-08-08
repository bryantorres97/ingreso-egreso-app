export class IngresoEgreso implements DataObj{
  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string;

  constructor(ingresoegreso: DataObj) {
    this.descripcion = (ingresoegreso && ingresoegreso.descripcion) || null;
    this.monto = (ingresoegreso && ingresoegreso.monto) || null;
    this.tipo = (ingresoegreso && ingresoegreso.tipo) || null;
    // this.uid = (ingresoegreso && ingresoegreso.uid) || null;
  }
}

interface DataObj {
  descripcion: string;
  monto: number;
  tipo: string;
  uid?: string;
}
