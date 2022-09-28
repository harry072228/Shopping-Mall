import { LoadingState } from "../../models";

export interface Product {
	id: number
	name: string
	icon: string
	description: string
}

export interface ProductState {
  loading: LoadingState; 
  
  products: Product[];

}