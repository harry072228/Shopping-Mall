import express from "express";

import { logger } from "../logger";
import { form } from "../middleware";
import {
  ProductPriceError,
  ProductStockError,
  ProductService,
} from "../services/productService";

export class ProductController {
  constructor(private productService: ProductService) { }

  // -------------------------------------------------------------------------------------------------------------------
  // get All product info
  // -------------------------------------------------------------------------------------------------------------------

  allProductInfo = async (req: express.Request, res: express.Response) => {
    try {
      const allProductInfo = await this.productService.allProductInfo();
      return res.json({
        result: true,
        msg: "Get Product ALL Information success",
        allProductInfo,
      });
    } catch (err) {
      logger.error(err);
      return res.json({
        result: false,
        msg: "Get All Product Information fail",
      });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get product info
  // -------------------------------------------------------------------------------------------------------------------

  productDetailInfo = async (req: express.Request, res: express.Response) => {
    const productId = Number(req.params.id);
    try {
      const productInfo = await this.productService.productDetailInfo(
        productId
      );
      return res.json({
        result: true,
        msg: "Get Product Information success",
        productInfo,
      });
    } catch (err) {
      logger.error(err);

      res
        .status(500)
        .json({ result: false, msg: "Get Product Information fail" });
      return;
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get product info
  // -------------------------------------------------------------------------------------------------------------------

  productInfo = async (req: express.Request, res: express.Response) => {
    const productId = Number(req.params.id);
    try {
      const productInfo = await this.productService.productInfo(productId);
      return res.json({
        result: true,
        msg: "Get Product Information success",
        productInfo: productInfo,
      });
    } catch (err) {
      logger.error(err);

      res
        .status(500)
        .json({ result: false, msg: "Get Product Information fail" });
      return;
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  productDetailIcon = async (req: express.Request, res: express.Response) => {
    const productId = Number(req.query.id);
    try {
      const productDetailIcon = await this.productService.productDetailIcon(productId);
      return res.json({
        result: true,
        msg: "Get ProductDetail Icon success",
        productDetailIcon,
      });
    } catch (err) {
      logger.error(err);

      res
        .status(500)
        .json({ result: false, msg: "Get ProductDetail Icon fail" });
      return;
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // AllProductDetailByProductName
  // -------------------------------------------------------------------------------------------------------------------

  AllProductDetail = async (req: express.Request, res: express.Response) => {
    const name = String(req.query.name)
    try {
      const AllProductDetail = await this.productService.AllProductDetailByProductName(name);
      return res.json({
        result: true,
        msg: "Get Product Information success",
        AllProductDetail,
      });
    } catch (err) {
      logger.error(err);

      res
        .status(500)
        .json({ result: false, msg: "Get Product Information fail" });
      return;
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get color info
  // -------------------------------------------------------------------------------------------------------------------

  colorInfo = async (req: express.Request, res: express.Response) => {
    try {
      const colorInfo = await this.productService.colorInfo();
      return res.json({
        result: true,
        msg: "Get Color Information success",
        colorInfo: colorInfo,
      });
    } catch (err) {
      logger.error(err);

      res
        .status(500)
        .json({ result: false, msg: "Get color Information fail" });
      return;
    }
  };
  // -------------------------------------------------------------------------------------------------------------------
  // get size info
  // -------------------------------------------------------------------------------------------------------------------

  sizeInfo = async (req: express.Request, res: express.Response) => {
    try {
      const sizeInfo = await this.productService.sizeInfo();
      return res.json({
        result: true,
        msg: "Get Size Information success",
        sizeInfo: sizeInfo,
      });
    } catch (err) {
      logger.error(err);

      res
        .status(500)
        .json({ result: false, msg: "Get size Information fail" });
      return;
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // create Product
  // -------------------------------------------------------------------------------------------------------------------

  createProduct = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const name =
          fields.name != null && !Array.isArray(fields.name)
            ? fields.name
            : err;

        const description =
          fields.description != null && !Array.isArray(fields.description)
            ? fields.description
            : err;

        const icon =
          files.icon != null && !Array.isArray(files.icon)
            ? files.icon.newFilename
            : err;

        const image1 =
          files.image1 != null && !Array.isArray(files.image1)
            ? files.image1.newFilename
            : err;

        const image2 =
          files.image2 != null && !Array.isArray(files.image2)
            ? files.image2.newFilename
            : err;

        const image3 =
          files.image3 != null && !Array.isArray(files.image3)
            ? files.image3.newFilename
            : err;

        const brand_id =
          fields.brand_id != null && !Array.isArray(fields.brand_id)
            ? fields.brand_id
            : err;

        await this.productService.createProduct(
          name,
          description,
          icon,
          image1,
          image2,
          image3,
          brand_id
        );
        return res.json({ result: true, msg: "create new product success" });
      } catch (err) {
        // if (err instanceof ProductPriceError) {
        //   return res.status(500).json({
        //     result: false,
        //     msg: "Product price must be greater than 0",
        //   });
        // } else if (err instanceof ProductStockError) {
        //   return res.status(500).json({
        //     result: false,
        //     msg: "Product stock must be greater than 0",
        //   });
        // }

        logger.error(err);
        res.status(500).json({ result: false, msg: "create product error" });

        return;
      }
    });
  };

  // -------------------------------------------------------------------------------------------------------------------
  // create ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  createProductDetail = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const product_id =
          fields.product_id != null && !Array.isArray(fields.product_id)
            ? fields.product_id
            : err;

        const color_id =
          fields.color_id != null && !Array.isArray(fields.color_id)
            ? fields.color_id
            : err;

        const size_id =
          fields.size_id != null && !Array.isArray(fields.size_id)
            ? fields.size_id
            : err;

        const price =
          fields.price != null && !Array.isArray(fields.price)
            ? fields.price
            : err;

        const stock =
          fields.stock != null && !Array.isArray(fields.stock)
            ? fields.stock
            : err;

        await this.productService.createProductDetail(
          product_id,
          color_id,
          size_id,
          price,
          stock
        );
        return res.json({ result: true, msg: "create new product success" });
      } catch (err) {
        if (err instanceof ProductPriceError) {
          return res.status(500).json({
            result: false,
            msg: "Product price must be greater than 0",
          });
        } else if (err instanceof ProductStockError) {
          return res.status(500).json({
            result: false,
            msg: "Product stock must be greater than 0",
          });
        }

        logger.error(err);
        res.status(500).json({ result: false, msg: "create product error" });

        return;
      }
    });
  };

  // -------------------------------------------------------------------------------------------------------------------
  // update Product
  // -------------------------------------------------------------------------------------------------------------------

  updateProduct = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      const productId = Number(req.params.id);

      try {
        const productInfos = (await this.productService.productInfo(productId))
          .productInfo[0];

        let oldName = productInfos.name;
        let oldBrand = productInfos.brand_id;
        let oldDescription = productInfos.description;
        let oldIcon = productInfos.icon;
        let oldImage1 = productInfos.image1;
        let oldImage2 = productInfos.image2;
        let oldImage3 = productInfos.image3;

        const newName =
          fields.newName != null && !Array.isArray(fields.newName)
            ? String(fields.newName)
            : oldName;

        const newBrand =
          fields.newBrand != null && !Array.isArray(fields.newBrand)
            ? String(fields.newBrand)
            : oldBrand;

        const newDescription =
          fields.newDescription != null && !Array.isArray(fields.newDescription)
            ? String(fields.newDescription)
            : oldDescription;

        const newIcon =
          files.newIcon != null && !Array.isArray(files.newIcon)
            ? String(files.newIcon.newFilename)
            : oldIcon;

        const newImage1 =
          files.newImage1 != null && !Array.isArray(files.newImage1)
            ? String(files.newImage1.newFilename)
            : oldImage1;

        const newImage2 =
          files.newImage2 != null && !Array.isArray(files.newImage2)
            ? String(files.newImage2.newFilename)
            : oldImage2;

        const newImage3 =
          files.newImage3 != null && !Array.isArray(files.newImage3)
            ? String(files.newImage3.newFilename)
            : oldImage3;

        const productInfo = await this.productService.updateProduct(
          productId,
          newName,
          newBrand,
          newDescription,
          newIcon,
          newImage1,
          newImage2,
          newImage3
        );
        return res.json({
          result: true,
          msg: "Update Product Information success",
          productInfo,
        });
      } catch (err) {
        logger.error(err);
        return res.json({
          result: false,
          msg: "Update Product Information fail",
        });
      }
    });
  };

  // -------------------------------------------------------------------------------------------------------------------
  // update ProductDetail
  // -------------------------------------------------------------------------------------------------------------------

  updateProductDetail = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      const productDetailId = Number(req.params.id);

      try {
        const productInfos = (
          await this.productService.productDetailInfo(productDetailId)
        ).productDetailInfo[0];

        let oldPrice = productInfos.price;
        let oldStock = productInfos.stock;
        let oldStatus_id = productInfos.status_id;

        const newPrice =
          fields.newPrice != null && !Array.isArray(fields.newPrice)
            ? Number(fields.newPrice)
            : oldPrice;

        const newStock =
          fields.newStock != null && !Array.isArray(fields.newStock)
            ? Number(fields.newStock)
            : oldStock;

        const newStatus_id =
          fields.newStatus_id != null && !Array.isArray(fields.newStatus_id)
            ? Number(fields.newStatus_id)
            : oldStatus_id;

        const productInfo = await this.productService.updateProductDetail(
          productDetailId,
          newPrice,
          newStock,
          newStatus_id
        );
        return res.json({
          result: true,
          msg: "Update Product Information success",
          productInfo,
        });
      } catch (err) {
        logger.error(err);
        return res.json({
          result: false,
          msg: "Update Product Information fail",
        });
      }
    });
  };

  // -------------------------------------------------------------------------------------------------------------------
  // create promotion 🤗
  // -------------------------------------------------------------------------------------------------------------------

  createPromotion = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const name = fields.name != null && !Array.isArray(fields.name)
          ? fields.name
          : err;

        const promotionInfo = await this.productService.createPromotion(name);
        return res.json({
          result: true,
          msg: "Create Promotion success",
          promotionInfo,
        });
      } catch (err) {
        logger.error(err);
        return res.json({
          result: false,
          msg: "Create Promotion fail",
        });
      }
    });
  };

  // -------------------------------------------------------------------------------------------------------------------
  // create promotion detail 🤗
  // -------------------------------------------------------------------------------------------------------------------

  createPromotionDetail = async (
    req: express.Request,
    res: express.Response
  ) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const promotion_id =
          fields.promotion_id != null && !Array.isArray(fields.promotion_id)
            ? fields.promotion_id
            : err;

        const productDetail_id =
          fields.productDetail_id != null && !Array.isArray(fields.productDetail_id)
            ? fields.productDetail_id
            : err;

        const product_number =
          fields.product_number != null && !Array.isArray(files.product_number)
            ? fields.product_number
            : err;

        const freebie_id =
          fields.freebie_id != null && !Array.isArray(fields.freebie_id)
            ? fields.freebie_id
            : err;

        const freebie_number =
          fields.freebie_number != null && !Array.isArray(fields.freebie_number)
            ? fields.freebie_number
            : err;

        await this.productService.createPromotionDetail(
          promotion_id,
          productDetail_id,
          product_number,
          freebie_id,
          freebie_number
        );
        return res.json({ result: true, msg: "create new PromotionDetail success" });
      } catch (err) {
        // if (err instanceof ProductPriceError) {
        //   return res.status(500).json({
        //     result: false,
        //     msg: "Product price must be greater than 0",
        //   });
        // } else if (err instanceof ProductStockError) {
        //   return res.status(500).json({
        //     result: false,
        //     msg: "Product stock must be greater than 0",
        //   });
        // }

        logger.error(err);
        res.status(500).json({ result: false, msg: "create PromotionDetail error" });

        return;
      }
    });
  };



  // -------------------------------------------------------------------------------------------------------------------
  // Delete Promotion By Id 🤗
  // -------------------------------------------------------------------------------------------------------------------

  deletePromotionDetail = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      try {
        const promotionDetailId = Number(req.params.id);
        await this.productService.deletePromotionDetail(promotionDetailId);
        return res.json({ result: true, msg: "Delete PromotionDetail success" });
      } catch (err) {
        logger.error(err);
        return res.json({ result: false, msg: "Delete PromotionDetail fail" });
      }
    });
  };


  // -------------------------------------------------------------------------------------------------------------------
  // search productIdByName
  // -------------------------------------------------------------------------------------------------------------------
  searchProductIdByName = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const keyword = String(req.query.keyword);
      const productInfos = await this.productService.productByName(keyword);

      // console.log(productId)
      return res.json({
        result: true,
        msg: "Search Product List by Name success",
        ProductList: productInfos,
      });
    } catch (err) {
      logger.error(err);
      return res.json({
        result: false,
        msg: "Search Product List by Name Fail",
      });
    }
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get productDetailByproductId
  // -------------------------------------------------------------------------------------------------------------------

  productDetailByProductId = async (
    req: express.Request,
    res: express.Response
  ) => {

    try {
      const product_id = Number(req.params.id);
      const productDetail = await this.productService.productDetailByProductId(
        product_id
      );

      // console.log(productId)
      return res.json({
        result: true,
        msg: "Search ProductDetail  by product_id success",
        productDetail
      });
    } catch (err) {
      logger.error(err);
      return res.json({
        result: false,
        msg: "Search ProductDetail  by product_id Fail",
      });
    }
  };


  // -------------------------------------------------------------------------------------------------------------------
  // get productDetailByproductId
  // -------------------------------------------------------------------------------------------------------------------

  productDetailByColorAndSize = async (
    req: express.Request,
    res: express.Response
  ) => {
    form.parse(req, async (err, fields) => {
      try {
        const product_id = Number(req.query.id);
        const productColor = String(req.query.color);
        const productSize = String(req.query.size);

        console.log(
          'product_id: ', product_id,
          'productColor: ', productColor,
          'productSize: ', productSize
        );




        const productDetail = await this.productService.productDetailByColorAndSize(
          product_id,
          productColor,
          productSize
        );


        const productDetailId = productDetail.productDetailId.rows[0].id
        const productPrice = productDetail.productPrice.rows[0].price;
        const productStock = productDetail.productStock.rows[0].stock;


        // console.log(productId)
        return res.json({
          result: true,
          msg: "Search ProductDetail  by ColorAndSize success",
          productDetailId,
          productPrice,
          productStock
        });
      } catch (err) {
        logger.error(err);
        return res.json({
          result: false,
          msg: "Search ProductDetail  by ColorAndSize Fail",
        });
      }
    });
  };

  // -------------------------------------------------------------------------------------------------------------------
  // get productIdByName（未用到）
  // -------------------------------------------------------------------------------------------------------------------
  //   productIdByName = async (req: express.Request, res: express.Response) => {
  //     try {
  //       const product = String(req.query.product);

  //       const productId = await this.productService.productDetailByName(product);

  //       // console.log(productId)
  //       return res.json({
  //         result: true,
  //         msg: "Get Product Id by Name success",
  //         productId,
  //       });
  //     } catch (err) {
  //       logger.error(err);
  //       return res.json({ result: false, msg: "Get Product ID by Name Fail" });
  //     }
  //   };
}
