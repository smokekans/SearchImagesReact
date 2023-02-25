import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../Services/Api';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (query.trim() === '') {
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotalHits(response.totalHits);

        if (page === 1 && response.totalHits !== 0) {
          toast.success(`Hooray! We found ${response.totalHits} images.`);
        }

        if (response.hits.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, page, error, totalHits]);

  const submitForm = value => {
    if (value.trim() === '') {
      return toast.warning('Enter your request');
    }
    setImages([]);
    setQuery(value);
    setPage(1);
  };

  const onClickLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  return (
    <Container>
      <Searchbar onSubmit={submitForm} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onClick={toggleModal} />
      {images.length !== 0 && <Button handleClick={onClickLoad} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={2500}
        closeOnClick
      />
    </Container>
  );
}
