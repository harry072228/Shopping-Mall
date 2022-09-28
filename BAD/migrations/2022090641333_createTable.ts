import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
   if (!(await knex.schema.hasTable("color"))) {


      //blue
      await knex.schema.createTable("color", (table) => {
         table.increments();
         table.string("name");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("size", (table) => {
         table.increments();
         table.string("name");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("category", (table) => {
         table.increments();
         table.string("name");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("discount", (table) => {
         table.increments();
         table.string("name").notNullable();
         table.float("value").notNullable();
      });
      await knex.schema.createTable("role", (table) => {
         table.increments();
         table.string("name").notNullable();
      });
      await knex.schema.createTable("status", (table) => {
         table.increments();
         table.string("name");
      });
      await knex.schema.createTable("brand", (table) => {
         table.increments();
         table.string("name");
      });
      await knex.schema.createTable("address", (table) => {
         table.increments();
         table.string("name");
      });


      //purple
      await knex.schema.createTable("user", (table) => {
         table.increments();
         table.string("username").notNullable();
         table.string("password").notNullable();
         table.string("email").notNullable();
         table.string("icon");
         table.string("nickname");
         table.integer("status_id").unsigned();
         table.foreign("status_id").references("status.id");
         table.integer("role_id").unsigned();
         table.foreign("role_id").references("role.id");
         table.timestamps(false, true);
      });
     
      await knex.schema.createTable("invoice", (table) => {
         table.increments();
         table.string("invoiceNumber").notNullable();
         table.integer("status_id").unsigned();
         table.foreign("status_id").references("status.id");
         table.integer("user_id").unsigned();
         table.foreign("user_id").references("user.id");
         table.integer("address_id").unsigned();
         table.foreign("address_id").references("address.id");
         table.float("totalPrice").notNullable().defaultTo(0);
         table.timestamps(false, true);
      });
      await knex.schema.createTable("promotion", (table) => {
         table.increments();
         table.string("name").notNullable();
         table.integer("status_id").unsigned();
         table.foreign("status_id").references("status.id");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("coupon", (table) => {
         table.increments();
         table.string("name").notNullable();
         table.integer("status_id").unsigned();
         table.foreign("status_id").references("status.id");
         table.integer("totalNumberOfCoupon").unsigned();
         table.timestamps(false, true);
      });
      await knex.schema.createTable("product", (table) => {
         table.increments();
         table.string("name").notNullable();
         table.string("description");
         table.string("icon");
         table.string("image1");
         table.string("image2");
         table.string("image3");
         table.integer("status_id").unsigned();
         table.foreign("status_id").references("status.id");
         table.integer('brand_id').unsigned();
         table.foreign('brand_id').references('brand.id');
         table.timestamps(false, true);
      });



      //green
      await knex.schema.createTable("productDetail", (table) => {
         table.increments();
         table.integer("product_id").unsigned();
         table.foreign("product_id").references("product.id");
         table.integer("color_id").unsigned();
         table.foreign("color_id").references("color.id");
         table.integer("size_id").unsigned();
         table.foreign("size_id").references("size.id");
         table.float("price").notNullable();
         table.integer("stock").notNullable();
         table.integer("status_id").unsigned();
         table.foreign("status_id").references("status.id");
         table.timestamps(false, true);
      });



      //yellow
      await knex.schema.createTable("promotion_productDetail", (table) => {
         table.increments();
         table.integer("promotion_id").unsigned();
         table.foreign("promotion_id").references("promotion.id");
         table.integer("productDetail_id").unsigned();
         table.foreign("productDetail_id").references("productDetail.id");
         table.integer("freebie_id").unsigned();
         table.integer("product_number").unsigned();
         table.integer("freebie_number").unsigned();
         table.integer("freebie_price").unsigned();
         table.timestamps(false, true);
      });
      await knex.schema.createTable("discount_promotion", (table) => {
         table.increments();
         table.integer("discount_id").unsigned();
         table.foreign("discount_id").references("discount.id");
         table.integer("promotion_id").unsigned();
         table.foreign("promotion_id").references("promotion.id");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("invoice_productDetail", (table) => {
         table.increments();
         table.integer("invoice_id").unsigned();
         table.foreign("invoice_id").references("invoice.id");
         table.integer("productDetail_id").unsigned();
         table.foreign("productDetail_id").references("productDetail.id");
         table.integer("number").unsigned();
         table.integer("price").unsigned();
         table.timestamps(false, true);
      });
      await knex.schema.createTable("category_product", (table) => {
         table.increments();
         table.integer("product_id").unsigned();
         table.foreign("product_id").references("product.id");
         table.integer("category_id").unsigned();
         table.foreign("category_id").references("category.id");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("discount_productDetail", (table) => {
         table.increments();
         table.integer("productDetail_id").unsigned();
         table.foreign("productDetail_id").references("productDetail.id");
         table.integer("discount_id").unsigned();
         table.foreign("discount_id").references("discount.id");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("discount_role", (table) => {
         table.increments();
         table.integer("role_id").unsigned();
         table.foreign("role_id").references("role.id");
         table.integer("discount_id").unsigned();
         table.foreign("discount_id").references("discount.id");
         table.timestamps(false, true);
      });
      // await knex.schema.createTable("brand_product", (table) => {
      //    table.increments();
      //    table.integer("brand_id").unsigned();
      //    table.foreign("brand_id").references("brand.id");
      //    table.integer("product_id").unsigned();
      //    table.foreign("product_id").references("product.id");
      //    table.timestamps(false, true);
      // });
      await knex.schema.createTable("coupon_discount", (table) => {
         table.increments();
         table.integer("discount_id").unsigned();
         table.foreign("discount_id").references("discount.id");
         table.integer("coupon_id").unsigned();
         table.foreign("coupon_id").references("coupon.id");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("user_address", (table) => {
         table.increments();
         table.integer("address_id").unsigned();
         table.foreign("address_id").references("address.id");
         table.integer("user_id").unsigned();
         table.foreign("user_id").references("user.id");
         table.timestamps(false, true);
      });
      await knex.schema.createTable("coupon_user", (table) => {
         table.increments();
         table.integer("coupon_id").unsigned();
         table.foreign("coupon_id").references("coupon.id");
         table.integer("user_id").unsigned();
         table.foreign("user_id").references("user.id");
         table.integer("status_id").unsigned();
         table.foreign("status_id").references("status.id");
         table.timestamps(false, true);
      });
//------------------------------------------------------------



// await knex.schema.dropTableIfExists("brand_product");

// knex.schema.table('promotion_product', table => {
//    table.renameColumn('product_id', 'productDetail_id')
// })
// knex.schema.table('discount_product', table => {
//    table.renameColumn('product_id', 'productDetail_id')
// })
// knex.schema.table('invoice_product', table => {
//    table.renameColumn('product_id', 'productDetail_id')
// })
// knex.schema.table('product', table => {
//    table.integer('brand_id').unsigned();
//    table.foreign('brand_id').references('brand.id');
// })
   }
}

export async function down(knex: Knex): Promise<void> {

   await knex.schema.dropTableIfExists("coupon_user");
   await knex.schema.dropTableIfExists("user_address");
   await knex.schema.dropTableIfExists("coupon_discount");
   await knex.schema.dropTableIfExists("brand_product");
   await knex.schema.dropTableIfExists("discount_role");
   await knex.schema.dropTableIfExists("discount_product");
   await knex.schema.dropTableIfExists("category_product");
   await knex.schema.dropTableIfExists("invoice_product");
   await knex.schema.dropTableIfExists("discount_promotion");
   await knex.schema.dropTableIfExists("promotion_product");



 

   await knex.schema.dropTableIfExists("coupon");
   await knex.schema.dropTableIfExists("promotion");
   await knex.schema.dropTableIfExists("invoice");
   await knex.schema.dropTableIfExists("product");
   await knex.schema.dropTableIfExists("user");

   await knex.schema.dropTableIfExists("productDetail");


   await knex.schema.dropTableIfExists("color");
   await knex.schema.dropTableIfExists("size");
   await knex.schema.dropTableIfExists("category");
   await knex.schema.dropTableIfExists("discount");
   await knex.schema.dropTableIfExists("role");
   await knex.schema.dropTableIfExists("status");
   await knex.schema.dropTableIfExists("brand");
   await knex.schema.dropTableIfExists("address");




}











