import React from "react";
import useMedias from "../../hooks/useMedias";
import Post from "./Post";
function Posts() {
  const medias = useMedias();
  return (
    <>
      <h1 className="text-light">Tus posts</h1>
      <div className="container-fluid">
        {medias.length > 0 ? (
          <div className="row gap-4 ">
            {medias.map((media) => (
              <Post media={media} key={media.id} />
            ))}
          </div>
        ) : (
          <h1 className="text-light text-center">No tienes posts</h1>
        )}
      </div>
    </>
  );
}

export default Posts;
