// PrivateProductComponent.tsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = useSelector((state: RootState) => {
    console.log({ state });
    return state.auth.token;
  });

  useEffect(() => {
    // Simulate token validation logic (replace with your actual token validation logic)
    const validateToken = async () => {
      // Example: Check if token is valid (could be an API call or local storage check)
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated to view this product.</div>;
  }

  return (
    <div className="private-product-component">
      <h3>Product Details (Private)</h3>

      {/* Additional private component UI or logic */}
    </div>
  );
};

export default Product;
