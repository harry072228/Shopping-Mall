import { Knex } from "knex";
import { Product, ProductDetail } from "../models";

export class ProductPriceError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductPriceError.prototype);
  }
}

export class ProductStockError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductStockError.prototype);
  }
}

export class ProductNameError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, ProductNameError.prototype);
  }
}

export class ProductService {
  constructor(private knex: Knex) {}

  // -------------------------------------------------------------------------------------------------------------------
  // Get All Product Info
  // -------------------------------------------------------------------------------------------------------------------

  async allProductInfo() {
    {
      const ProductList = await this.knex<Product>("product")
      .select("*")
      .orderBy("id", "desc");
      
      return ProductList;
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // Get All Color Info
  // -------------------------------------------------------------------------------------------------------------------

  async colorInfo() {
    {
      const colorList = await this.knex("color").select("*");
      // `SELECT * FROM product INNER JOIN product_color pc ON
      // product.id = pc.product_id`

      return colorList;
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // Get All Color Info
  // -------------------------------------------------------------------------------------------------------------------

  async sizeInfo() {
    {
      const sizeList = await this.knex("size").select("*");
      // `SELECT * FROM product INNER JOIN product_color pc ON
      // product.id = pc.product_id`

      return sizeList;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Get individual Product Info
  // -------------------------------------------------------------------------------------------------------------------

  async productInfo(productId: number) {
    //console.log(this.tableName)
    {
      const productInfo = await this.knex("product")
        .select("*")
        .where("id", productId); //.andWhere( "status_id", 1)

      return { productInfo };
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // Get individual ProductDetail Info
  // -------------------------------------------------------------------------------------------------------------------

  async productDetailInfo(productId: number) {
    //console.log(this.tableName)
    {
      const productInfo = await this.knex("product")
        .select("*")
        .where("id", productId); //.andWhere( "status_id", 1)

      const productDetailInfo = await this.knex("productDetail")
        .select("*")
        .where("product_id", productId); //.andWhere( "status_id", 1)

      // const productColorInfo = await this.knex
      // .raw(
      // 	/*sql */
      // 	`select * from color
      // 	where id in (
      // 	select color_id from product_color where product_id = ?)`,[productId])

      // const productSizeInfo = await this.knex
      // .raw(
      // 	/*sql */
      // 	`select * from size
      // 	where id in (
      // 	select size_id from product_size where product_id = ?)`,[productId])

      return { productInfo, productDetailInfo };
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // Get individual ProductDetail Icon
  // -------------------------------------------------------------------------------------------------------------------

  async productDetailIcon(productId: number) {
    //console.log(this.tableName)
    {
      const productDetailicon =  await this.knex.raw(
        /*sql */
      `with
      t_aaa as
      (
                select 
                pd.id as product_id,
                p.name as product_name,
                c.id as color_id,
                c."name" as color_name,
      s.id as size_id,
                s.name as size_name,
                price as product_price,
                stock,
                s2.id as status_id,
                s2.name as status_name,
                icon,
                description
                
                from 
                ((("productDetail" pd 
                inner join product p on p.id = pd.product_id)
                inner join color c on c.id = pd.color_id)
                inner join "size" s on s.id = pd.size_id )
                inner join status s2 on s2.id = pd.status_id 
                
                order by product_id desc
                )
                
                select
      product_id,
      product_name,
      color_name,
      size_name,
      product_price,
      stock,
      icon
      from
      t_aaa  where "product_id" = ? `,[productId])

      return { productDetailicon };
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Create New Product
  // -------------------------------------------------------------------------------------------------------------------

  async createProduct(
    name: string,
    description: string,
    icon: string,
    image1: string,
    image2: string,
    image3: string,
    brand_id: number
  ) {
    // insert new product

    {
      if (!name) {
        throw new ProductNameError();
      } else {
        const newProductRecord = await this.knex<Product>("product")
          .insert({
            name: name,
            description: description,
            icon: icon,
            image1: image1,
            image2: image2,
            image3: image3,
            brand_id: brand_id,
          })
          .returning("*");

        return newProductRecord;
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Create New ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async createProductDetail(
    product_id: number,
    color_id: number,
    size_id: number,
    price: number,
    stock: number
  ) {
    // insert new product

    {
      if (price < 0) {
        throw new ProductPriceError();
      }

      if (stock < 0) {
        throw new ProductStockError();
      } else {
        const newProductDetailRecord = await this.knex<ProductDetail>(
          "productDetail"
        )
          .insert({
            product_id: product_id,
            color_id: color_id,
            size_id: size_id,
            price: price,
            stock: stock,

            status_id: 1,
          })
          .returning("*");

        return newProductDetailRecord;
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Update Product
  // -------------------------------------------------------------------------------------------------------------------

  async updateProduct(
    productId: number,
    newName: string,
    newBrand: number,
    newDescription: string,
    newIcon: string,
    newImage1: string,
    newImage2: string,
    newImage3: string
  ) {
    {
      if (!newName) {
        throw new ProductNameError();
      }

      const productRecord = await this.knex<Product>("product")

        .update({
          name: newName,
          description: newDescription,
          icon: newIcon,
          image1: newImage1,
          image2: newImage2,
          image3: newImage3,
          brand_id: newBrand,
        })

        .where("id", productId)
        .returning("*");

      return productRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Update ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async updateProductDetail(
    productDetailId: number,
    newPrice: number,
    newStock: number,
    newStatus_id: number
  ) {
    {
      {
        if (newPrice < 0) {
          throw new ProductPriceError();
        }

        if (newStock < 0) {
          throw new ProductStockError();
        }

        const productDetailRecord = await this.knex<ProductDetail>(
          "productDetail"
        )

          .update({
            price: newPrice,
            stock: newStock,
            status_id: newStatus_id,
          })

          .where("id", productDetailId)
          .returning("*");

        return productDetailRecord;
      }
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Delete All ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async deleteAllProductDetail(productId: number) {
    {
      const productDetailRecord = await this.knex<ProductDetail>(
        "productDetail"
      )
        .update("status_id", 2)
        .where("product_id", productId)
        .returning("*");

      return productDetailRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // Delete ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  async deleteProductDetail(productDetailId: number) {
    {
      const productDetailRecord = await this.knex<ProductDetail>(
        "productDetail"
      )
        .update("status_id", 2)
        .where("id", productDetailId)
        .returning("*");

      return productDetailRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // create promotion
  // -------------------------------------------------------------------------------------------------------------------
  async createPromotion(promotion: string) {
    {
      const promotionRecord = await this.knex("promotion")
        .insert({
          name: promotion,
          status_id: 1,
        })
        .returning("*");

      return promotionRecord;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // create promotion details by promotionId (promotion_product)
  // -------------------------------------------------------------------------------------------------------------------

  async createPromotionDetail(
    promotion_id: number,
    productDetail_id: number,
    product_number: number,
    freebie_id: number,
    freebie_number: number
  ) {
    {
      const promotionDetails = await this.knex("promotion_productDetail")
        .insert({
          promotion_id: promotion_id,
          productDetail_id: productDetail_id,
          product_number: product_number,
          freebie_id: freebie_id,
          freebie_number: freebie_number,
          freebie_price: 0,
        })
        .returning("*");

      return promotionDetails;
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // delete promotion details by promotionId (promotion_product)
  // -------------------------------------------------------------------------------------------------------------------

  async deletePromotionDetail(promotionDetailId: number) {
    {
      const promotionDetails = await this.knex.raw(
        /*sql */
        `delete from "promotion_productDetail" where id = ?`,
        [promotionDetailId]
      );

      // ("promotion_product")
      // .returning("*");

      return promotionDetails;
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // get promotion info
  // -------------------------------------------------------------------------------------------------------------------
  async getPromotionInfo() {
    {
      const allPromotionInfo = await this.knex("promotion").select("*");

      return allPromotionInfo;
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // search productByName
  // -------------------------------------------------------------------------------------------------------------------

  async productByName(keyword: string) {
    {
      const productInfo = await this.knex.raw(
        /*sql */
        `SELECT * FROM "product" WHERE name ILIKE ? order by updated_at desc`,
        ["%" + keyword + "%"]
      );

      //   const productDetail = await this.knex.raw(
      //     /*sql */
      //     `
      // 	SELECT *
      // 	FROM productDetail
      // 	WHERE product_id = ?
      // 	AND status_id = 1
      // 	`,
      //     [productId]
      //   );

      return productInfo;
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // search productDetailByProductId
  // -------------------------------------------------------------------------------------------------------------------

  async productDetailByProductId(product_id: number) {
    {

      const productDetailColor = await this.knex.raw(
        /*sql */
      `select "name" from "color" inner join "productDetail" 
      on "color".id = "productDetail".color_id where "productDetail".product_id = ?  group by color.id `,[product_id])


      const productDetailSize = await this.knex.raw(
        /*sql */
      `select "name"  from "size" inner join "productDetail"
      on "size".id = "productDetail".size_id where "productDetail".product_id = ?  group by size.id `,[product_id])

      const thisProductAllColors = productDetailColor.rows;
      const thisProductAllSizes = productDetailSize.rows;

      return {
        thisProductAllColors,
        thisProductAllSizes
        };
    }
  }
  // -------------------------------------------------------------------------------------------------------------------
  // search AllProductDetailByProductName
  // -------------------------------------------------------------------------------------------------------------------

  async AllProductDetailByProductName(product_name: String) {
    {

      const AllProductDetail = await this.knex.raw(
        /*sql */
      `with
      t_aaa as
      (
                select 
                pd.id as product_id,
                p.name as product_name,
                c.id as color_id,
                c."name" as color_name,
      s.id as size_id,
                s.name as size_name,
                price as product_price,
                stock,
                s2.id as status_id,
                s2.name as status_name,
                icon,
                description
                
                from 
                ((("productDetail" pd 
                inner join product p on p.id = pd.product_id)
                inner join color c on c.id = pd.color_id)
                inner join "size" s on s.id = pd.size_id )
                inner join status s2 on s2.id = pd.status_id 
                
                order by product_id desc
                )
                
                select
      product_id,
      product_name,
      color_name,
      size_name,
      product_price,
      stock,
      icon
      from
      t_aaa  where "product_name" ilike ? `,["%"+product_name+"%"])




      return {
        AllProductDetail
        };
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // search productDetailByColorAndSize
  // -------------------------------------------------------------------------------------------------------------------

  async productDetailByColorAndSize(
    product_id: number,
    productColor: String,
    productSize: String
  ) {
    {
      //   const productInfo = await this.knex.raw(
      //     /*sql */
      //     `SELECT id FROM product WHERE name ILIKE ? order by updated_at desc`,
      //     ["%" +  + "%"]
      //   );

      const productColor_id = await this.knex.raw(
        /*sql */
        `select "id" 
        from "color" 
        where "name" ILIKE ?`,
        [productColor])

        // console.log(productColor_id.rows[0].id);
        

      const productSize_id = await this.knex.raw(
        /*sql */
        `select id from "size" s  where  "name" Ilike ?`,
        [productSize])


        // console.log(productSize_id);
        

        const productDetailId = await this.knex.raw(
          /*sql */
          `
          select "id" from "productDetail" where "product_id" = ? and "color_id" = ? and "size_id" = ?
      `,
          [product_id, productColor_id.rows[0].id, productSize_id.rows[0].id]
        );  


      const productPrice = await this.knex.raw(
        /*sql */
        `
        select "price" from "productDetail" where "product_id" = ? and "color_id" = ? and "size_id" = ?
		`,
        [product_id, productColor_id.rows[0].id, productSize_id.rows[0].id]
      );

      const productStock = await this.knex.raw(
        /*sql */
        `
        select "stock" from "productDetail" where "product_id" = ? and "color_id" = ? and "size_id" = ?
		`,
        [product_id, productColor_id.rows[0].id, productSize_id.rows[0].id]
      );
      

      return {productDetailId,productPrice,productStock};
    }
  }

  // -------------------------------------------------------------------------------------------------------------------
  // get productIdByName (唔知有咩用🤔)
  // -------------------------------------------------------------------------------------------------------------------

  //   async productIdByName(name: string) {
  //     {
  //       const productId = await this.knex.raw(
  // 		/*sql */
  //         `

  // 				SELECT * FROM product WHERE name = ?
  // 			`,
  //         [name]
  //       );

  //       return productId;
  //     }
  //   }










}


