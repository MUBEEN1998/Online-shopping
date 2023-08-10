import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categorys, setCategorys] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      setCategorys(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categorys;
}
