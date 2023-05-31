import { createAction, createReducer, on, props } from "@ngrx/store";
import { IProduct } from "./app.reduce";


export const sucess = createAction('SUCESS',
  props<{ payload: number }>())
export const error = createAction('ERROR', props<{ payload: number }>());

// export const decrementCount = createAction('DECREMENT_COUNT',
// )
// export const defineContador = createAction('DEFINE_CONTADOR',
// props<{payload: number}>()
// )

export const setId = createAction('SET_ID',
  props<{ value: string }>()
)
// export const loadProduct = createAction('LOAD_PRODUCTS')
// export const sucessoProduct = createAction('SUCESS_PRODUCTS')
