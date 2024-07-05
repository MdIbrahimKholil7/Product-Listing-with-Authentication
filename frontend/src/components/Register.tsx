import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../redux/store";
import { authSlice } from "../redux/auth/authApi";
import { userLoggedIn, switchToggle } from "../redux/auth/authSlice";
import { RegisterFormInputs } from "../interface/userInterface";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [register, { isLoading, error, isError }] =
    authSlice.useRegisterMutation();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const toggle: boolean = useSelector((state: RootState) => state.auth.toggle);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const user = await register(data).unwrap();
      dispatch(userLoggedIn(user));
      toast.success("Registered successfully!");
      navigate("/product");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-8 p-4 border border-gray-200 rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full p-2 border ${
              errors.name ? "border-red-500" : "border-gray-200"
            } rounded`}
            {...formRegister("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-2 border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } rounded`}
            {...formRegister("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full p-2 border ${
              errors.password ? "border-red-500" : "border-gray-200"
            } rounded`}
            {...formRegister("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            className={`w-full p-2 border ${
              errors.address ? "border-red-500" : "border-gray-200"
            } rounded`}
            {...formRegister("address", { required: "Address is required" })}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>

        <div
          onClick={() => {
            dispatch(switchToggle(!toggle));
          }}
          className="py-4 text-blue-500 cursor-pointer"
        >
          Already have an account! Login
        </div>
        {isError &&
          typeof error === "object" &&
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null && // Check if error.data is not null or undefined
          "message" in error.data && (
            <div className="text-red-500 py-1 text-center mb-2">
              {(error.data as { message: string }).message}
            </div>
          )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </>
  );
};

export default Register;
