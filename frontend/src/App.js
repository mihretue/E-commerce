
import React from "react";
import ProductList from "./component/productList";
// import Navigation from "./component/navBar";
import About from "./component/about";

import {Routes,Route, BrowserRouter} from "react-router-dom"

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigation/>}> */}
            <Route index element={<ProductList/>}/>
            <Route path='/About' element={<About/>}/>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
