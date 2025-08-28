import { AppDataSource } from "../config/database";
import { Product } from "../entities/product";
import { Request, Response } from "express";

// Utility to generate slug from product name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const addProduct = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const { name, price, description, brand, size, stock } = req.body;
  try {
    if (!name || !price || !description || !brand || !size) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const slug = generateSlug(name);

    // Check for duplicate slug
    const existing = await productRepo.findOne({ where: { slug } });
    if (existing) {
      return res.status(409).send({
        success: false,
        message: "Product with similar name already exists",
      });
    }

    // Handle image upload (multer stores files in req.files)
    let images: string[] = [];
    const PORT = process.env.PORT || 5000;
    const baseUrl = req.protocol + '://' + req.get('host');
    if (req.files && (req.files as any).image) {
      const imageFiles = (req.files as any).image;
      if (Array.isArray(imageFiles)) {
        images = imageFiles.map((file: any) => `${baseUrl}/uploads/${file.filename}`);
      } else {
        images = [`${baseUrl}/uploads/${imageFiles.filename}`];
      }
    }

    const newProduct = productRepo.create({
      name,
      price,
      description,
      brand,
      size,
      stock: stock ? Number(stock) : 0,
      slug,
      images,
    });

    await productRepo.save(newProduct);
    return res.status(201).send({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  try {
    const products = await productRepo.find();
    if (!products || products.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No products found",
        data: []
      });
    }
    return res.status(200).send({
      success: true,
      data: products,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const { id } = req.params;

  try {
    const product = await productRepo.findOne({
      where: { id: id },
    });

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get product by slug
export const getProductBySlug = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const { slug } = req.params;

  try {
    const product = await productRepo.findOne({
      where: { slug },
    });

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const existingProduct = await productRepo.findOne({
      where: { id: id },
    });

    if (!existingProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Update slug if name changes
    if (name && name !== existingProduct.name) {
      const newSlug = generateSlug(name);
      // Check for duplicate slug
      const duplicate = await productRepo.findOne({ where: { slug: newSlug } });
      if (duplicate && duplicate.id !== existingProduct.id) {
        return res.status(409).send({
          success: false,
          message: "Product with similar name already exists",
        });
      }
      existingProduct.slug = newSlug;
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.price = price || existingProduct.price;
    existingProduct.description = description || existingProduct.description;

    await productRepo.save(existingProduct);
    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productRepo = AppDataSource.getRepository(Product);
  const { id } = req.params;

  try {
    const existingProduct = await productRepo.findOne({
      where: { id: id },
    });

    if (!existingProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    await productRepo.remove(existingProduct);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
