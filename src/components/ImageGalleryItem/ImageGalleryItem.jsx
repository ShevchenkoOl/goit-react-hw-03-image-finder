import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ tags,
  webformatURL,
  largeImageURL,
  onImageClick
}) => {
    return(
  <li className={css.ImageGalleryItem}onClick={() => onImageClick(largeImageURL, tags)}>
    <img
      src={webformatURL}
      alt={tags}
      name={largeImageURL}
      className={css.ImageGalleryItemImage}
    />
  </li>
);
    }

    ImageGalleryItem.propTypes = {
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      onImageClick: PropTypes.func.isRequired,
    };