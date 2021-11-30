import React from "react";
import { IMediaIG } from "../../utils/Medias";
import moment from "moment";
import { Link } from "react-router-dom";

function Post({ media }: { media: IMediaIG }) {
  return (
    <>
      <div className="card col-md-3 col-lg-3 col-xl-2">
        <Link to={`/post/${media.id}/${media.media_type}`}>
          <img
            src={
              media.media_type === "VIDEO"
                ? media.thumbnail_url
                : media.media_url
            }
            className="card-img-top"
            alt={media.id}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{media.caption}</h5>
          <p
            className="card-text"
            style={{
              textTransform: "capitalize",
            }}
          >
            {moment(media.timestamp).fromNow()}
          </p>
        </div>
      </div>
    </>
  );
}

export default Post;
