const tables = [
    "00-address.ts",
    "01-role.ts",
    "03-discount.ts",
    "04-category.ts",
    "05-brand.ts",
    "06-color.ts",
    "07-size.ts",
    "08-status.ts",
    "10-product.ts",
    "11-coupon.ts",
    "12-promotion.ts",
    "13-user.ts",
    "14-invoice.ts",
    "15-discount_product.ts",
    "16-discount_role.ts",
    "17-discount_coupon.ts",
    "18-discount_promotion.ts",
    "19-promotion_product.ts",
    "20-coupon_discount.ts",
    "21-coupon_user.ts",
    "22-product_color.ts",
    "23-product_size.ts",
    "24-category_product.ts",
    "25-brand_product.ts",
    "26-invoice_product.ts",
    "27-user_address.ts",    
]

const reverseTables = tables.reverse()

export async function seedAll(knex: any) {
    for (let t of reverseTables) {
        const file = require(`../seeds/${t}`)
        const seed = file.seed
        await seed(knex)
    }
}
