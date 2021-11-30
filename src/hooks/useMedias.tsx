import { useContext } from "react";
import { MediasContext } from "../context/mediasContext";
import Medias from "../utils/Medias";

function useMedias() {
  const { medias, setMedias } = useContext(MediasContext);
  return new Medias(medias, setMedias);
}

export default useMedias;
