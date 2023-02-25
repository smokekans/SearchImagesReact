import { ImgGalleryItem, ImgGalleryImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
  id,
}) {
  return (
    <ImgGalleryItem key={id} id={id} onClick={() => onClick(largeImageURL)}>
      <ImgGalleryImg src={webformatURL} alt={tags} />
    </ImgGalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
