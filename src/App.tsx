import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import BottomNavBar from "views/BottomNavBar";
import Cards from "views/Cards";
import InterestedProducts from "views/InterestedProducts";

const App = () => {
  const [interestedProducts, setInterestedProducts] = useState<IProduct[]>([]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Cards
              interestedProducts={interestedProducts}
              setInterestedProducts={setInterestedProducts}
            />
          }
        />
        <Route
          path="products"
          element={
            <InterestedProducts interestedProducts={interestedProducts} />
          }
        />
      </Routes>
      <BottomNavBar />
    </div>
  );
};

export default App;
