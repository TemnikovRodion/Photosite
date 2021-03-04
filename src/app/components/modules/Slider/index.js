import React from 'react';
import ImageGallery from 'react-image-gallery';
import { serverImagesUrl } from '../../../assets/scripts/serverUrls';

// Импорт стилей
import './styles.scss';
import "react-image-gallery/styles/scss/image-gallery.scss";


export default function Slider(props) {
  return (
    <ImageGallery
      items={props.items.map(item => {
        return {
          original: serverImagesUrl(props.reducerName, props.parentId, 'pc', item.name),
          imageSet: [
            {
              srcSet: serverImagesUrl(props.reducerName, props.parentId, 'pc', item.name),
              media: '(min-width: 1280px)',
            },
            {
              srcSet: serverImagesUrl(props.reducerName, props.parentId, 'tablet', item.name),
              media: '(min-width: 768px)',
            },
            {
              srcSet: serverImagesUrl(props.reducerName, props.parentId, 'mobile', item.name),
              media: '(min-width: 0px)',
            }
          ]
        }

      })}
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
      autoPlay={false}
      lazyLoad={true} />
  );
}