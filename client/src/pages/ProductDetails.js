import React, { useState, useEffect } from "react";
import Layout from "./../conponents/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductsDetails.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //Intial Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //Get Similar Products
  const getSimilarProduct = async (pid, pic) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${pic}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={product.name}>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            width="300"
            height="500"
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>
            Price:
            {product?.price?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </h6>
          <h6>Category: {product?.category?.name}</h6>

          <button
            className="btn btn-dark ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}

        {/* Related Products */}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt="p.name"
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>

                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
