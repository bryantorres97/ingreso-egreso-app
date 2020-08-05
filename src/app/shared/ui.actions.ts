import { Action } from '@ngrx/store';

export const ACTIVAR_LOADING = '[UI Loading] Cargando....';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de carga.';

export class ActivarLoadingAction implements Action {
  readonly type = ACTIVAR_LOADING;
  constructor() {}
}

export class DesactivarLoadingAction implements Action {
  readonly type = DESACTIVAR_LOADING;
  constructor() {}
}

export type acciones = ActivarLoadingAction | DesactivarLoadingAction;
