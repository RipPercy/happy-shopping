import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../conponents/hooks/useCategory";
import Layout from "../conponents/Layout/Layout";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"Happy Shopping - All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-6 mb-3 gx-5 gy-5" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
