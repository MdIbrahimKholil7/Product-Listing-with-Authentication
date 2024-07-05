// PrivateProductComponent.tsx

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import productApi from "../redux/product/productApi";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = useSelector((state: RootState) => {
    return state.auth.token;
  });
  const { data, isLoading, error } = productApi.useGetProductQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate token validation logic (replace with your actual token validation logic)
    const validateToken = async () => {
      // Example: Check if token is valid (could be an API call or local storage check)
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, [token]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="w-full h-screen text-center text-3xl flex justify-center items-center flex-col">
          You are not authenticated to view this product.
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-bold rounded mt-10 text-xl"
            onClick={() => navigate("/")}
          >
            Back to main page
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="private-product-component">
      {error ? (
        <>
          {typeof error === "object" &&
            "data" in error &&
            typeof error.data === "object" &&
            error.data !== null && // Check if error.data is not null or undefined
            "message" in error.data && (
              <div className="text-red-500 py-1 text-center mb-2">
                {(error.data as { message: string }).message}
              </div>
            )}
        </>
      ) : (
        <div>
          <pre>{JSON.stringify(data?.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Product;
