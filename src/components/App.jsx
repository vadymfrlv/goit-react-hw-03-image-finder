import React, { Component } from 'react';
import API from '../services/PixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loading: false,
    modalImage: null,
    firstFetch: true,
    error: null,
  };

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      firstFetch: true,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    prevQuery !== nextQuery && this.fetchImages();
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    API.fetchImagesWithQuery(searchQuery, page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));

        if (!this.state.firstFetch) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({
          loading: false,
          firstFetch: false,
        });
      });
  };

  openModal = imageUrl => {
    this.setState({ modalImage: imageUrl });
  };

  closeModal = e => {
    this.setState({ modalImage: null });
  };

  render() {
    const { images, loading, modalImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onClick={this.openModal} />
        {modalImage && <Modal largeImage={modalImage} onClose={this.closeModal} />}
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Loader type="ThreeDots" color="#a2fb48" height={150} width={150} />
          </div>
        )}
        {images.length > 0 && !loading && <Button onClick={this.fetchImages} />}
      </div>
    );
  }
}
