import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async addProduct(
        @Body('title') prodTile: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = await this.productService.insertProduct(
            prodTile,
            prodDesc,
            prodPrice
        );
        return { id: generatedId };
    }

    @Get()
    async getAllProdcuts() {
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('desc') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        await this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string){
        await this.productService.deleteProduct(prodId);
        return null;
    }
}