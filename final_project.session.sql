
            CREATE TABLE "user" (
            "id" SERIAL,
            "username" VARCHAR(255) NOT NULL,
            "password" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) NOT NULL,
            "icon" VARCHAR(255),
            "nickname" VARCHAR(255),
            "status_id" VARCHAR(255) NOT NULL,
            "role_id" INT NOT NULL,
            "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
            "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "role" (
            "id" SERIAL,
            "name" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "brand" (
            "id" SERIAL,
            "name" VARCHAR(255),
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "product" (
            "id" SERIAL,
            "name" CHAR,
            "description" CHAR,
            "status_id" VARCHAR(255) NOT NULL,
            "icon" CHAR NOT NULL,
            "image1" CHAR,
            "image2" CHAR,
            "image3" CHAR,
            "created_at" TIMESTAMP,
            "updated_at" TIMESTAMP,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "brand_product" (
            "id" SERIAL,
            "brand_id" INT,
            "product_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "discount" (
            "id" SERIAL,
            "value" FLOAT4 NOT NULL,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "category" (
            "id" SERIAL,
            "name" CHAR,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "discount_product" (
            "id" SERIAL,
            "product_id" INT,
            "discount_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "category_product" (
            "id" SERIAL,
            "product_id" INT,
            "category_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "invoice" (
            "id" SERIAL,
            "invoiceNumber" VARCHAR(255) NOT NULL,
            "status_id" INT,
            "user_id" INT NOT NULL,
            "address_id" INT NOT NULL,
            "totalPrice" FLOAT4 NOT NULL,
            "created_at" DATE,
            "updated_at" DATE,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "discount_role" (
            "id" SERIAL,
            "role_id" INT,
            "discount_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "invoice_product" (
            "id" SERIAL,
            "invoice_id" INT,
            "productDetail_id" INT,
            "number" INT,
            "price" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "address" (
            "id" SERIAL,
            "name" VARCHAR(255),
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "user_address" (
            "id" SERIAL,
            "address_id" INT,
            "user_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "promotion" (
            "id" SERIAL,
            "name" VARCHAR(255) NOT NULL,
            "status_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "discount_promotion" (
            "id" SERIAL,
            "promotion_id" INT,
            "discount_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "promotion_product" (
            "id" SERIAL,
            "promotion_id" INT,
            "product_id" INT,
            "freebie_id" INT,
            "product_number" INT,
            "freebie_number" INT,
            "freebie_price" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "coupon" (
            "id" SERIAL,
            "name" VARCHAR(255) NOT NULL,
            "status_id" INT NOT NULL,
            "totalNumberOfCoupon" INT NOT NULL,
            "expiry_date" TIME WITHOUT TIME ZONE,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "coupon_discount" (
            "id" SERIAL,
            "discount_id" INT,
            "coupon_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "coupon_user" (
            "id" SERIAL,
            "user_id" INT,
            "coupon_id" INT,
            "status_id" INT,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "color" (
            "id" SERIAL,
            "name" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "size" (
            "id" SERIAL,
            "name" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "status" (
            "id" SERIAL,
            "name" VARCHAR(255) NOT NULL,
            PRIMARY KEY ("id")
         );
         
         CREATE TABLE "productDetail" (
            "id" SERIAL NOT NULL,
            "product_id" INT NOT NULL,
            "color_id" INT,
            "size_id" INT,
            "price" FLOAT4 NOT NULL,
            "stock" FLOAT4 NOT NULL,
            PRIMARY KEY ("id")
         );
         
         
         ALTER TABLE "user" ADD CONSTRAINT "FK_080b74d7-77c6-4c20-be8c-1c8030b830e2" FOREIGN KEY ("role_id") REFERENCES "role"("id")  ;
         
         ALTER TABLE "user" ADD CONSTRAINT "FK_e3d0d33d-6ded-4cce-82fc-668c0762a2a9" FOREIGN KEY ("status_id") REFERENCES "status"("id")  ;
         
         ALTER TABLE "product" ADD CONSTRAINT "FK_3e973e1b-1d51-43b3-bd54-74b0a514c81b" FOREIGN KEY ("status_id") REFERENCES "status"("id")  ;
         
         ALTER TABLE "brand_product" ADD CONSTRAINT "FK_4d8a301f-18e2-4282-a932-05ffbbd0ce06" FOREIGN KEY ("brand_id") REFERENCES "brand"("id")  ;
         
         ALTER TABLE "brand_product" ADD CONSTRAINT "FK_b2a31a53-cef5-4f1d-9ce9-42ab61fa1543" FOREIGN KEY ("product_id") REFERENCES "product"("id")  ;
         
         ALTER TABLE "discount_product" ADD CONSTRAINT "FK_1386a32e-6384-4716-a648-35cbac1cbd1d" FOREIGN KEY ("discount_id") REFERENCES "discount"("id")  ;
         
         ALTER TABLE "discount_product" ADD CONSTRAINT "FK_e9b2ca05-5c32-46f1-900c-315ac99e8522" FOREIGN KEY ("product_id") REFERENCES "product"("id")  ;
         
         ALTER TABLE "category_product" ADD CONSTRAINT "FK_52118c41-eeab-451c-925b-5ca1d8d300f0" FOREIGN KEY ("product_id") REFERENCES "product"("id")  ;
         
         ALTER TABLE "category_product" ADD CONSTRAINT "FK_1f2599ac-a655-4152-a401-541d4970d3e6" FOREIGN KEY ("category_id") REFERENCES "category"("id")  ;
         
         ALTER TABLE "invoice" ADD CONSTRAINT "FK_b6c9c46d-fb14-45c3-8b86-330584a0a493" FOREIGN KEY ("user_id") REFERENCES "user"("id")  ;
         
         ALTER TABLE "invoice" ADD CONSTRAINT "FK_2ffe5d91-0f8c-4ced-a0b6-9955e16ec6e5" FOREIGN KEY ("address_id") REFERENCES "address"("id")  ;
         
         ALTER TABLE "invoice" ADD CONSTRAINT "FK_e6706de8-8a14-41ef-92d3-1c5032f47a96" FOREIGN KEY ("status_id") REFERENCES "status"("id")  ;
         
         ALTER TABLE "discount_role" ADD CONSTRAINT "FK_c77d730f-4033-465a-b38c-dc2644144e00" FOREIGN KEY ("role_id") REFERENCES "role"("id")  ;
         
         ALTER TABLE "discount_role" ADD CONSTRAINT "FK_90f0be2b-9462-4305-8afa-1e621b563ec3" FOREIGN KEY ("discount_id") REFERENCES "discount"("id")  ;
         
         ALTER TABLE "invoice_product" ADD CONSTRAINT "FK_fc6fec4a-018a-4702-ad58-bdf5191b906c" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id")  ;
         
         ALTER TABLE "invoice_product" ADD CONSTRAINT "FK_acbe2a6b-6cb7-43c6-93b4-bffc11441ef7" FOREIGN KEY ("productDetail_id") REFERENCES "productDetail"("id")  ;
         
         ALTER TABLE "user_address" ADD CONSTRAINT "FK_5e789c87-2e22-492d-8849-32e638a7ae7a" FOREIGN KEY ("address_id") REFERENCES "address"("id")  ;
         
         ALTER TABLE "user_address" ADD CONSTRAINT "FK_28ec20af-aa0d-4ed5-9887-64c32ba63800" FOREIGN KEY ("user_id") REFERENCES "user"("id")  ;
         
         ALTER TABLE "promotion" ADD CONSTRAINT "FK_b676a758-22a4-4250-a13e-dbf774f8d5f5" FOREIGN KEY ("status_id") REFERENCES "status"("id")  ;
         
         ALTER TABLE "discount_promotion" ADD CONSTRAINT "FK_b43f7d5d-2b11-4554-a578-d4c39bdb5577" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id")  ;
         
         ALTER TABLE "discount_promotion" ADD CONSTRAINT "FK_947882a7-ac80-4b21-85eb-267b8b023f1f" FOREIGN KEY ("discount_id") REFERENCES "discount"("id")  ;
         
         ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_50f873fb-f181-4e43-a914-b17fafa4ff83" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id")  ;
         
         ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_4521b05f-754f-483f-9e45-586ae95b8c9f" FOREIGN KEY ("product_id") REFERENCES "product"("id")  ;
         
         ALTER TABLE "promotion_product" ADD CONSTRAINT "FK_bef1a385-6e24-4b71-8cc8-498f8c79e954" FOREIGN KEY ("freebie_id") REFERENCES "product"("id")  ;
         
         ALTER TABLE "coupon" ADD CONSTRAINT "FK_c078410c-0094-4d1a-82fe-a1d4e393d6e0" FOREIGN KEY ("status_id") REFERENCES "status"("id")  ;
         
         ALTER TABLE "coupon_discount" ADD CONSTRAINT "FK_fb4fe447-327c-4752-9d97-ff937576c6e6" FOREIGN KEY ("discount_id") REFERENCES "discount"("id")  ;
         
         ALTER TABLE "coupon_discount" ADD CONSTRAINT "FK_d3322a14-c4bf-4198-bebe-ee8df2e0e849" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id")  ;
         
         ALTER TABLE "coupon_user" ADD CONSTRAINT "FK_d1b459bb-608b-48dc-ac2b-dbfc5f5bf43a" FOREIGN KEY ("user_id") REFERENCES "user"("id")  ;
         
         ALTER TABLE "coupon_user" ADD CONSTRAINT "FK_d6e2336e-c16f-4b20-8126-dcf5ccd37989" FOREIGN KEY ("coupon_id") REFERENCES "coupon"("id")  ;
         
         ALTER TABLE "coupon_user" ADD CONSTRAINT "FK_c9e4b925-d2e5-4309-bb74-53f0317c8cba" FOREIGN KEY ("status_id") REFERENCES "status"("id")  ;
         
         ALTER TABLE "productDetail" ADD CONSTRAINT "FK_7708b86a-1ddc-4026-bb35-feb45f6f14cc" FOREIGN KEY ("product_id") REFERENCES "product"("id")  ;
         
         ALTER TABLE "productDetail" ADD CONSTRAINT "FK_084219b2-c866-41a0-b079-b29c0c5faa12" FOREIGN KEY ("color_id") REFERENCES "color"("id")  ;
         
         ALTER TABLE "productDetail" ADD CONSTRAINT "FK_f80dd72c-83f5-4081-9201-b7d22de5b9c2" FOREIGN KEY ("size_id") REFERENCES "size"("id")  ;
        