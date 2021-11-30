import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Carousel from "../components/post/Carousel";
import fetchMedias from "../services/fetchMedias";
import { useNavigate } from "react-router-dom";
import { IMediaIG } from "../utils/Medias";

function PostPage() {
  const nav = useNavigate();

  const [loadingMedias, setLoadingMedias] = useState(true);
  const [medias, setMedias] = useState<IMediaIG[]>([] as IMediaIG[]);
  const [mediaIG, setMediaIG] = useState<IMediaIG>({} as IMediaIG);
  const [post, setPost] = useState<IMediaIG>({} as IMediaIG);
  const params = useParams();

  const getAlbum = () =>
    fetchMedias(`/media/${params.id}?media_type=${params.type}`).then(
      (data) => {
        setPost(data.data);
        const queueFetch = data?.data?.children?.data?.map((child: any) => {
          return fetchMedias(`/media/${child.id}?media_type=CAROUSEL_PHOTO`);
        });
        Promise.all(queueFetch)
          .then((data) => {
            console.log("Childs", data);
            const images = data.map((child: any) => {
              return child.data;
            });
            setMedias(images);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoadingMedias(false);
          });
      }
    );

  const getMedia = () =>
    fetchMedias(`/media/${params.id}?media_type=${params.type}`)
      .then((data) => {
        setMediaIG(data.data);
        setPost(data.data);
      })
      .finally(() => {
        setLoadingMedias(false);
      });

  useEffect(() => {
    const getMediaData = () => {
      setLoadingMedias(true);
      if (params.type === "CAROUSEL_ALBUM") {
        getAlbum();
        return;
      }
      getMedia();
    };

    getMediaData();
  }, [params]);

  useEffect(() => {
    if ((!loadingMedias && medias?.length <= 0) || !mediaIG) {
      nav("/", { replace: true });
    }
  }, []);

  return (
    <div className="p-4">
      <div
        className="col-12 col-md-12 d-flex flex-column bg-dark align-items-center p-4"
        style={{
          minHeight: "90vh",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-light">{moment(post.timestamp).fromNow()}</h1>
        <div className="row gap-3 justify-content-center">
          {loadingMedias ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              <div className="spinner text-light" role="status"></div>
            </div>
          ) : (
            <>
              {medias.length > 1 && <Carousel medias={medias} />}
              {medias.length === 1 && (
                <img
                  src={medias[0].media_url}
                  className="d-block w-100 img-fluid"
                  alt={medias[0].id}
                />
              )}
              {mediaIG && (
                <img
                  src={mediaIG?.media_url}
                  className="img-fluid"
                  alt={mediaIG?.id}
                />
              )}
              <h3 className="text-light">Titulo: {post.caption}</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
