import { Product } from "../../models/product";

export class ProductResponse{
    currentPage: number;
    pagesCount: number;
    products: Array<Product>
}