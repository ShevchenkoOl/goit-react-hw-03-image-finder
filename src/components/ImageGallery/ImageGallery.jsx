import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
//import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onImageClick }) => (
  <ul className={css.ImageGallery}>
    {images.map(image => {
      return (
      <ImageGalleryItem 
            key={image.id}
            webformatURL={image.webformatURL}
            tags={image.tags}
            largeImageURL={image.largeImageURL}
            onImageClick={onImageClick}
      />
      );
    })}
  </ul>
);

// ImageGallery.propTypes = {
//   images: PropTypes.arrayOf(
//     PropTypes.object).isRequired,
//   onImageClick: PropTypes.func.isRequired,
// };
