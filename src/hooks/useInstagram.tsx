import { useContext } from "react";
import { AuthInstagramContext } from "../context/authInstagramContext";
import { InstagramFetch } from "../utils/Instagram";

const useUserIG = () => {
  const { userIG, setUserIG } = useContext(AuthInstagramContext);
  return new InstagramFetch(userIG, setUserIG);
};

export default useUserIG;
