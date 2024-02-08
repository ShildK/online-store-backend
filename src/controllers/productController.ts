import { Request, Response } from "express";
import { categories } from "../mock/category_mock";
import { products } from "../mock/product_mock";
import { ProductResponse } from "./models/productResponse";
import { FilterResponse } from "./models/filterResponse";

export const getProducts = (req: Request, res: Response) => {
   const {
      orderBy,
      limit,
      pageNumber,
      priceFrom,
      priceTo,
      categoryId,
      brand,
      text,
   }: {
      orderBy?: string;
      limit?: number;
      pageNumber?: number;
      priceFrom?: number;
      priceTo?: number;
      categoryId?: number;
      brand?: string;
      text?: string;
   } = req.query;

   let filteredProducts = products;

   if (text != null && text != "") {
      filteredProducts = filteredProducts.filter((product) =>
         product.name.toLowerCase().startsWith(text.toLowerCase())
      );
   }
   if (priceFrom != null) {
      filteredProducts = filteredProducts.filter((p) => p.price >= priceFrom);
   }
   if (priceTo != null) {
      filteredProducts = filteredProducts.filter((p) => p.price <= priceTo);
   }
   if (categoryId != null) {
      let _categories = JSON.parse(JSON.stringify(categories));
      let categoriesIds = _categories
         .filter((c: any) => c.parentId === Number(categoryId) || c.id === Number(categoryId))
         .map((c: any) => c.id);
      filteredProducts = filteredProducts.filter((p) =>
         categoriesIds.includes(p.categoryId)
      );
      
   }
   if (brand != null && brand != "") {
      filteredProducts = filteredProducts.filter((p) => p.brand == brand);
   }

   if (orderBy != null) {
      if (orderBy == "PriceASC") {
         filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      } else if (orderBy == "PriceDESC") {
         filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }
   }

   let page = pageNumber != null ? pageNumber : 1;
   let pageSize = limit != null ? limit : 20;

   const startIndex = (page - 1) * pageSize;
   const endIndex = page * pageSize;

   const totalPages = Math.ceil(filteredProducts.length / pageSize);
   const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

   let response = new ProductResponse();
   response.currentPage = page;
   response.pagesCount = totalPages;
   response.products = paginatedProducts;

   res.json(response);
};

export const getProductById = (req: Request, res: Response) => {
   const { productId }: { productId?: number } = req.query;
   if (productId == undefined) {
      return res.status(404).send("Введите id продукта");
   }

   let product = products.find((p) => p.id == productId);
   res.json(product);
};

export const getFilter = (req: Request, res: Response) => {
   const { categoryId }: { categoryId?: number } = req.query;
   let filterResponse = new FilterResponse();
   filterResponse.brands = [];
   filterResponse.priceMax = undefined;
   filterResponse.priceMin = undefined;
   let filteredProducts = products;

   if (categoryId) {
      filteredProducts = filteredProducts.filter(
         (p) => p.categoryId == categoryId
      );
   }

   if (filteredProducts.length != 0) {
      filterResponse.brands = [
         ...new Set(filteredProducts.map((p) => p.brand)),
      ];
      filterResponse.priceMin = filteredProducts.reduce(
         (min, obj) => (obj.price < min ? obj.price : min),
         filteredProducts[0].price
      );
      filterResponse.priceMax = filteredProducts.reduce(
         (max, obj) => (obj.price > max ? obj.price : max),
         filteredProducts[0].price
      );
   }
   res.json(filterResponse);
};

export const getCategories = (req: Request, res: Response) => {
   res.json(categories);
};
