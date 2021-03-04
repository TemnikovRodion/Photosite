import React from 'react';
import { serverImagesUrl } from '../../../assets/scripts/serverUrls';
import { setImageSrcOnView } from '../../../assets/scripts/imagesLazyLoad';

/* Стили */
import './styles.scss';

export default function Picture(props) {

  const imageObserver = (e) => {
    let picture = e.target.parentNode;

    let options = {
      threshold: 0
    } // options

    let observer = new IntersectionObserver(setImageSrcOnView, options);
    observer.observe(picture);
  }

  return (
      <picture
        className={'lazyload'}
        onLoadCapture={(e) => imageObserver(e)}>
          <source 
            srcSet={serverImagesUrl(props.reducerName, props.parentId, 'preview', props.imageName)}
            data-srcset={serverImagesUrl(props.reducerName, props.parentId, 'tablet', props.imageName)}
            media="(max-width: 1279px)" />
          <source
            srcSet={serverImagesUrl(props.reducerName, props.parentId, 'preview', props.imageName)}
            data-srcset={serverImagesUrl(props.reducerName, props.parentId, 'mobile', props.imageName)}
            media="(max-width: 767px)" />
          <img
            srcSet={serverImagesUrl(props.reducerName, props.parentId, 'preview', props.imageName)}
            data-srcset={serverImagesUrl(props.reducerName, props.parentId, 'pc', props.imageName)}
            alt="" />
      </picture>
  );
}