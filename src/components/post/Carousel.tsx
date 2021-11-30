import React from "react";
import { IMediaIG } from "../../utils/Medias";
import { Carousel } from "react-responsive-carousel";

function CarouselComponent({ medias }: { medias: IMediaIG[] }) {
  return (
    <>
      <Carousel>
        {medias
          .filter((media) => media.media_url)
          .map((media: IMediaIG) => (
            <div key={media.id}>
              <img src={media.media_url} alt={media.id} />
              <p className="legend">{media?.caption || media.username}</p>
            </div>
          ))}
      </Carousel>
    </>
  );
}

export default CarouselComponent;
