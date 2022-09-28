import Knex from 'knex'
import { ProductService,
    ProductPriceError,
    ProductStockError,
    ProductNameError 
 } from '../../services/productService'
const knexfile = require('../../knexfile') // Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']) // Now the connection is a testing connection.



describe('Integration test of productService', () => {
	let productService: ProductService
	productService = new ProductService(knex)

    beforeAll(async () => {
		return knex.migrate.rollback()
    .then(function() {
      return knex.migrate.latest();
    })
    .then(function() {
      return knex.seed.run();
    });
});

	afterAll(async () => {
		await knex.destroy()

	})
    

    it('get  All product information(By Roll Count)', async () => {

        //Act
        const productRecord = await productService.allProductInfo()
    
        //Assert

        expect(productRecord.length).toBe(3)

    })



    it('get individual product information', async () => {
		//Act
		const productRecord = await productService.productInfo(1)
        
        
		//Assert
		expect(productRecord.product[0].name).toBe("Apple Watch")
        expect(productRecord.product[0].price).toBe(100)
        expect(productRecord.product[0].image).toBe("13.jpg")
        expect(productRecord.product[0].description).toBe("Test")
        expect(productRecord.product[0].status_id).toBe(1)
        expect(productRecord.product[0].stock).toBe(100)
        expect(productRecord.color.rowCount).toBe(2)
        expect(productRecord.color.rows[0].id).toBe(1)
        expect(productRecord.color.rows[1].id).toBe(2)
        expect(productRecord.color.rows[0].name).toBe("Red")
        expect(productRecord.color.rows[1].name).toBe("Blue")
        expect(productRecord.size.rowCount).toBe(2)
        expect(productRecord.size.rows[0].name).toBe("S")
        expect(productRecord.size.rows[1].name).toBe("M")
})



    it('can edit product information', async () => {
        //Act
        
        const newProductRecord = await productService.updateProduct(1, 'Nike Watch', 99, "梁國鴻議員.jpg", "HIHI", 2, 200)
        
        //Assert
        
        expect(newProductRecord[0].name).toBe('Nike Watch')
        expect(newProductRecord[0].price).toBe(99)
        expect(newProductRecord[0].stock).toBe(200)
        expect(newProductRecord[0].image).toBe('梁國鴻議員.jpg')
        expect(newProductRecord[0].description).toBe('HIHI')
        expect(newProductRecord[0].status_id).toBe(2)
    })

    it('can create product', async () => {

        //Act
        const newProductRecord = await productService.createProduct("Puma Watch Test", 99, "16.jpg", "Test", 150, 1)
        
        //Assert

        expect(newProductRecord[0].name).toBe('Puma Watch Test')
        expect(newProductRecord[0].price).toBe(99)
        expect(newProductRecord[0].image).toBe('16.jpg')
        expect(newProductRecord[0].description).toBe('Test')
        expect(newProductRecord[0].status_id).toBe(1)
        expect(newProductRecord[0].stock).toBe(150)
    })


    it('cannot create new Product (ProductPriceError)', async () => {
		//Act
        try{
           await productService.createProduct("Puma Watch Test", -1, "16.jpg", "Test", 1, 150)
		   fail('should throw ProductMissingCreateInfoError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(ProductPriceError)
        }
	})

    it('cannot create new Product (ProductStockError)', async () => {
		//Act
        try{
           await productService.createProduct("Puma Watch Test", 1, "16.jpg", "Test", -150, 1)
		   fail('should throw ProductStockError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(ProductStockError)
        }
	})

    it('cannot create new Product (ProductNameError)', async () => {
		//Act
        try{
           await productService.createProduct('', 100, "16.jpg", "Test", 1, 150)
		fail('should throw ProductNameError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(ProductNameError)
        }
	})

    it('cannot update Product (ProductNameError)', async () => {
		//Act
        try{
           await productService.updateProduct(1,'', 100, "16.jpg", "Test", 1, 150)
		fail('should throw ProductNameError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(ProductNameError)
        }
	})

    it('cannot update Product (ProductPriceError)', async () => {
		//Act
        try{
           await productService.updateProduct(1,'on9 Jai', -100, "16.jpg", "Test", 1, 150)
		fail('should throw ProductPriceError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(ProductPriceError)
        }
	})

    it('cannot update Product (ProductStockError)', async () => {
		//Act
        try{
           await productService.updateProduct(1,'on9 Jai', 100, "16.jpg", "Test", 1, -100)
		fail('should throw ProductStockError')
        }
		//Assert
        catch(err){
            expect(err).toBeInstanceOf(ProductStockError)
        }
	})

    it('can delete product', async () => {

        //Act
        const newProductRecord = await productService.deleteProduct(2)
        
        //Assert

        expect(newProductRecord[0].status_id).toBe(2)
        
    })

    it('can not delete product', async () => {

        //Act
        const newProductRecord = await productService.deleteProduct(2)
        
        //Assert

        expect(newProductRecord[0].status_id).toBe(2)
        
    })

	it('can create promotion', async () => {
		//Arrange
		const promotion = "買1支apple watch送1支apple watch"

		//Act
		const result = await productService.createPromotion(promotion)

		//Assert
		expect(result[0].name).toBe("買1支apple watch送1支apple watch");
	})

	it('can create promotion details', async () => {
		//Arrange
		const promotion = "買1支Samsung watch送1支Samsung watch"
		const productName = "Samsung Watch"
		const productNumber = 1
		const freebieName = "Samsung Watch"
		const freebieNumber = 1

		const productId = (await productService.productIdByName(productName)).rows[0].id
        console.log(productId);
        
        
		const freebieId = (await productService.productIdByName(freebieName)).rows[0].id
		
		//Act
		const promotionRecord = await productService.createPromotion(promotion)
        
		const result = await productService.createPromotionDetails(promotionRecord[0].id, productId, productNumber, freebieId, freebieNumber)		

		//Assert
		expect(result[0].promotion_id).toBe(5);
		expect(result[0].product_id).toBe(2);
		expect(result[0].product_number).toBe(1);
		expect(result[0].freebie_id).toBe(2);
		expect(result[0].freebie_number).toBe(1);
		expect(result[0].freebie_price).toBe(0);
	})

    it('can search product Id by name', async () => {
        //Arrange
        const keyword = "Samsung"
        

        //Act
        const productId = (await productService.searchProductIdByName(keyword)).rows[0]
        // console.log(productId)
        
        //Assert

        expect(productId.id).toBe(2)
        expect(productId.name).toBe("Samsung Watch")

        
    })

    it('can get product Id by name', async () => {
        //Arrange
        const name = "Samsung Watch"
        
        //Act
        const productId = (await productService.productIdByName(name)).rows[0]

        console.log(productId)
        
        //Assert

        expect(productId.id).toBe(2)
        expect(productId.name).toBe("Samsung Watch")

        
    })
})