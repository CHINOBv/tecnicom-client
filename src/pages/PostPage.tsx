import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchMedias from "../services/fetchMedias";
import { IMediaIG } from "../utils/Medias";

function PostPage() {
  const [media, setMedia] = useState({} as IMediaIG);
  const params = useParams();

  useEffect(() => {
    const getMediaData = () => {
      fetchMedias(`/media/${params.id}`).then((data) => {
        console.log(data);
      });
    };

    getMediaData();
  }, [params]);

  return (
    <div className="p-4">
      <div
        className="col-12 col-md-12 d-flex flex-column bg-dark align-items-center p-4"
        style={{
          minHeight: "90vh",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-light">PostPage</h1>
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="card">{/* <img src={} /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
