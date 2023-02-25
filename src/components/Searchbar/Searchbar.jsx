import { useState } from 'react';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  SearchFormSpan,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [image, setImage] = useState('');

  const handleChange = e => {
    setImage(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (image.trim() === '') {
      return toast.warn('Enter your request!');
    }
    onSubmit(image);
    setImage('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BsSearch size="20" />
          <SearchFormSpan>Search</SearchFormSpan>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={image}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
