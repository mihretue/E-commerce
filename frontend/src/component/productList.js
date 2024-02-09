import React, {useEffect, useState} from "react";
import axios from "axios"
import Navigation from "./navBar";
import ProductPage from "../productPage";
import Footer from "./footer";
// import {useParams} from "react-router-dom"

export default function ProductList(
) {
  // const{productId} = useParams()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] =useState(false)

    const getProducts = async ()=>{
      try {
        

        const response = await axios.get("http://localhost:8000/api/products")
        console.log(response.data)
        const Data = response.data
        setProducts(
          Data
        )

        setIsLoading(true)

      } catch (error) {
        console.log(error)
      }
    }

    useEffect (()=>{
        getProducts()
    },[])


  return (
    <>
    <Navigation/>
    <div className="container">
      <div className="row ">
        {isLoading ? (
          <>
          {products.length > 0 ? (
            <>
            {
              products.map((product, index)=>{
                return(
                  <ProductPage key={index} product= {product} />
                )
              })
            }
            </>
          ):(
            <div>
              there is no product
            </div>
          )}
          </>
        ):(
          "Loading"
        )}
      </div>
    </div>
    <Footer/>
    </>
  )
}

