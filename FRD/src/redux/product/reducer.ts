import { LoadingState } from "../../models";
import { ProductActions } from "./action";
import { ProductState } from "./state";
import produce from 'immer'

const initialState: ProductState = {
  products: [],
  loading: LoadingState.NotLoaded,
}

export function productReducer(state: ProductState = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case '@@product/LOADED_ONE_PRODUCT':
      {
        const productIndex = state.products.findIndex(product => product.id === action.product.id)
        const products = state.products.slice()
        products[productIndex] = action.product
        return {
          ...state,
          products: products
        }
      }
    case '@@product/LOADED_PRODUCT':
      return {
        ...state,
        products: action.products,
        loading: LoadingState.Loaded
      }
  }

  return state
}