import { createReducer, on } from "@ngrx/store";
import { error, sucess } from "./app.actions";

export interface IProduct {
    id: number;
    description: string;
    price: number;
    quantity: number;
}

export interface IAppState { /// definira interface para o estado da aplicação
    sucess: number;
    error: number
    products: IProduct[];
}

export const INITIAL_STATE: IAppState = { // define o estado inicial da aplicação
    sucess: 0,
    error: 0,
    products: []
}

export const appReducer = createReducer(
    INITIAL_STATE,
    ///posso definir a ação para cada action que chegar ( q eu criar)
    on(
       sucess, (state, {payload}) => ({ ...state, sucess: payload})
    ),
    on(
        error, (state, {payload}) => ({ ...state, error: payload})
    )
)
