"use client";
import React, { useEffect, useState } from "react";
import classes from "./menuCategories.module.css";
import Link from "next/link";

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const baseURL = process.env.NEXTAUTH_URL;
  useEffect(() => {
    fetch(`${baseURL}/api/category`)
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className={classes.categoryList}>
      {categories.map((category) => (
        <Link
          key={category.category_ID}
          href={`/blog?cat=${category.category_Name}`}
        >
          <span className={`${classes.categoryItem} ${classes.bg}`}>
            {category.category_Name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
