import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { authSlice } from "../redux/auth/authApi";
import { switchToggle, userLoggedIn } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading, error }] = authSlice.useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const toggle: boolean = useSelector((state: RootState) => state.auth.toggle);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const user = await login(data).unwrap();
      dispatch(userLoggedIn(user));
      toast.success("Login successfully");
      navigate("/product");
    } catch (err) {
      console.error("Failed to log in:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-4 border border-gray-200 rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          {...register("email", { required: "Email is required" })}
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
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div
        onClick={() => {
          dispatch(switchToggle(!toggle));
        }}
        className="py-4 text-blue-500 cursor-pointer"
      >
        Don't have an account? Create a new account
      </div>
      {error &&
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
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
