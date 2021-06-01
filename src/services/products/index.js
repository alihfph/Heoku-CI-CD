import express from "express"
import ProductModel from "../../models/products/index.js"

const { Router } = express

const productsRouter = new Router()

productsRouter.get("/", async (req, res) => {
    const products = await ProductModel.find({})
    res.status(200).send({ products })
})

productsRouter.post("/", async (req, res) => {

    try {
        const { description, price } = req.body

        if (!description || !price) throw new Error("Invalid data")

        const product = new ProductModel({ description, price })
        await product.save()

        res.status(201).send(product)

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

productsRouter.put("/:productId", async (req, res, next) => {
    try {
      const modifiedProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { runValidators: true, new: true }
      );
      if (modifiedProduct) {
        res.send(200);
      } else {
        const error = new Error();
        error.httpStatusCode = 404;
        next(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


productsRouter.delete("/:productId", async (req, res, next) => {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(
        req.params.productId
      );
      if (deletedProduct) {
        res.status(204).send("Product deleted!");
      } else {
        const error = new Error();
        error.httpStatusCode = 404;
        next(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default productsRouter