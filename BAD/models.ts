export interface User {
	id: number
	username: string
	password: string
    email: string
	icon: string
	nickname: string
	status_id: number
	role_id: number
}
export interface User2 {
	userId: number,
	invoiceId: number,
}

export interface Product {
	id: number
	name: string
	description: string
	icon: string
	image1: string
	image2: string
	image3: string
	brand_id: number
}

export interface ProductDetail {
	id: number
	product_id: number
	color_id: number
	size_id: number
	price: number
	stock: number
	status_id: number
}


export interface Invoice {
	id: number
	invoiceNumber: string
	status_id: number
	user_id: number
	address_id: number
	totalPrice: number
}

export interface Invoice_product {
	id: number
	invoice_id: number
	productDetail_id: number
	number: number
	price: number
}

export interface payloadType {
	userId: number
}


declare global {
	namespace Express {
	  interface Request {
		user?: User2;
	  }
	}
  }

export enum Status{
	Active = 1,
	Inactive = 2,
	Pending = 3,
	Unpaid = 4,
	Paid = 5

}
export enum Address{
	Default = 1,
	Other = 2

}

export enum Role{
	Admin = 1,
	NormalUser = 2,
	VIP = 3
}

