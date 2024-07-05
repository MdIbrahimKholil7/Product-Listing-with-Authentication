import { useSelector } from "react-redux";
import Register from "./Register";

import Login from "./Login";
import { RootState } from "../redux/store";

const Home = () => {
  const toggle: boolean = useSelector((state: RootState) => state.auth.toggle);
  return <div>{toggle ? <Register /> : <Login />}</div>;
};

export default Home;
