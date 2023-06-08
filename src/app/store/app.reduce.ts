import { createReducer, on } from "@ngrx/store";
import { error, sucess, setId } from "./app.actions";
import { Pet } from "../statistic/model/statistic";

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
    consultpetId: Pet;
}

export const INITIAL_STATE: IAppState = { // define o estado inicial da aplicação
    sucess: 0,
    error: 0,
    products: [],
    consultpetId: {
        id: '',
        name: '',
        type: '',
        breed: '',
        birthdate: '',
    }
}

export const appReducer = createReducer(
    INITIAL_STATE,
    ///posso definir a ação para cada action que chegar ( q eu criar)
    on(
       sucess, (state, {payload}) => ({ ...state, sucess: payload})
    ),
    on(
        error, (state, {payload}) => ({ ...state, error: payload})
    ),
    on(
      setId, (state, {value}) => ({ ...state, consultpetId: value})
    )
)
