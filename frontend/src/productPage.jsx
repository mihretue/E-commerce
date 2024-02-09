
import React, {useState} from "react"
import styled from "styled-components"



const AddToCart = styled.button`
background-color: #3498db,
cursor: pointer,
transition: background-color 0.3s ease;
&:hover {
    background-color: lightblue;
}
`;


const ProductPage = ({product})=>{

    const [added, setIsAdded] = useState(0)
    
    const handleClick = () =>{
    
            setIsAdded(added + 1)
            alert("item is added to cart")
            console.log(added)
    
    }
    return(
        <div className="col-6 col-lg-3 col-sm-5 mx-3 border rounded m-1 ">
            <img src={product.image} className="mx-auto img img-fluid" style={{height:"23vh", marginTop:"2vh",width:"95%"}}/>
            <h2 className="text-center ">{product.productName}</h2>
            <div>{product.price} $</div>
            <div>{product.quantity}</div>
            <p>Numbers On Cart : {added}</p>
            <AddToCart onClick={handleClick}  className=" rounded-1 btn m-1">Add To Cart</AddToCart>
        </div>
    )
}

export default ProductPage;