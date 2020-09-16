import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProd = new this.productModel({ title: title, desc: desc, price: price });
        const result = await newProd.save();
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            desc: prod.desc,
            price: prod.price
        }));
    }

    async getSingleProduct(prodId: string) {
        const product = await this.findProduct(prodId);
        return {
            id: product.id,
            title: product.title,
            desc: product.desc,
            price: product.price
        };
    }

    async updateProduct(productId: string, prodTitle: string, prodDesc: string, prodPrice: number) {
        const updatedProduct = await this.findProduct(productId);
        if (prodTitle) {
            updatedProduct.title = prodTitle;
        }
        if (prodDesc) {
            updatedProduct.desc = prodDesc;
        }
        if (prodPrice) {
            updatedProduct.price = prodPrice;
        }

        updatedProduct.save();
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (err) {
            throw new NotFoundException('Could not find product.');
        }
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        if (!result.n) {
            throw new NotFoundException('Could not find product.');
        }
    }
}