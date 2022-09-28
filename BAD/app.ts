// -------------------------------------------------------------------------------------------------------------------
// imports (DO NOT EXPORT ANYTHING FORM App.ts)
// -------------------------------------------------------------------------------------------------------------------
import express from "express";
import { logger } from "./logger";
import dotenv from "dotenv";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
import { createUserRoutes } from "./routes/userRoutes";
import { ProductService } from "./services/productService";
import { ProductController } from "./controllers/productController";
import { createProductRoutes } from "./routes/productRoutes";

import { createProfileRoutes } from "./routes/profileRoutes";
import { ProfileController } from "./controllers/profileController";
import { ProfileService } from "./services/profileService";
import { InvoiceController } from "./controllers/invoiceController";
import { InvoiceService } from "./services/invoiceService";
import { createInvoiceRoutes } from "./routes/invoiceRoutes";
import cors from "cors";
import * as knexConfig from './knexfile'
import 'dotenv/config'
import './models'
import Knex from 'knex'


// -------------------------------------------------------------------------------------------------------------------
// Knex
// -------------------------------------------------------------------------------------------------------------------

dotenv.config();

// -------------------------------------------------------------------------------------------------------------------
// main script
// -------------------------------------------------------------------------------------------------------------------

const knex = Knex(knexConfig[process.env.NODE_ENV ?? 'development'])

const app = express();

//cors
app.use(
  cors({
    origin: [process.env.NEXT_PUBLIC_DOMAIN!],
    credentials: true,
    exposedHeaders: ['X-C21-TOKEN'],
  })
  );
  
  const PORT = process.env.PORT || 8000;
  
  
  // -------------------------------------------------------------------------------------------------------------------
  // others
  // -------------------------------------------------------------------------------------------------------------------
  
  //connect to client
  // client.connect();
  
  //urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  //json
  app.use(express.json());
  
  // app.use((req, res, next) => {
  //   setTimeout(() => {
  //     next();
  //   }, 100)
  // })

//get HTML files from public, default images & uploads
app.use(express.static("public")); //get files from private
const userService = new UserService(knex);
const invoiceService = new InvoiceService(knex);
const productService = new ProductService(knex);

const profileService = new ProfileService(knex);
const userController = new UserController(userService, invoiceService);
app.use(express.static('private'))	

//using fake data not need to use this
// app.use("/serverDefaultedImages", express.static("images"));
// app.use("/userUploadedFiles", express.static("uploads"));

app.use("/serverDefaultedImages", express.static("images"));
app.use("/userUploadedFiles", express.static("uploads"));

// get code from usersRoute

const profileController = new ProfileController(profileService);

const productController = new ProductController(productService);

const invoiceController = new InvoiceController(
  profileService,
  invoiceService,
);

app.use(createUserRoutes(userController));
app.use(createProfileRoutes(profileController));
app.use(createProductRoutes(productController));
app.use(createInvoiceRoutes(invoiceController));

// --------------------------------------------------------------------------------------------------------------------
// Error 404
//---------------------------------------------------------------------------------------------------------------------

app.use((req, res) => {
  res.status(404);
  res.send("404 Not Found");
});

// --------------------------------------------------------------------------------------------------------------------
// listening
//---------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
