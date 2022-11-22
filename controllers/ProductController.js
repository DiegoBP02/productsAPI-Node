const Product = require("../Models/ProductModel");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const createProduct = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    throw new NotFoundError("There is no product");
  }
  res.status(StatusCodes.OK).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findOne({ _id: productId, createdBy: userId });

  if (!product) {
    throw new NotFoundError(`There is no job with ${productId} id`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findByIdAndUpdate(
    { _id: productId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new NotFoundError(`There is no product with ${productId} id`);
  }

  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findByIdAndDelete({
    _id: productId,
    createdBy: userId,
  });

  if (!product) {
    throw new NotFoundError(`There is no product with ${productId} id`);
  }

  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
