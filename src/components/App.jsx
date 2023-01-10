import { Component } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages, notifySettings } from '../api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import React from 'react';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    picsArr: [],
    isLoading: false,
    onImageClick: false,
    showLoadMoreBtn: false,
    imageTags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.setState({ isLoading: true });
      this.fetchQuery(this.state.searchQuery, this.state.page);
    }
  }

  onSubmit = FormData => {
    const { query } = FormData;
    this.setState({ searchQuery: query, page: 1, picsArr: [] });
  };

  async fetchQuery(query, page) {
    try {
      await fetchImages (query, page).then(result => {
        const data = result.data;
        const total = data.totalHits;
        const picsArr = data.hits;
        const picsLeft = total - 12 * this.state.page;

        if (picsArr.length === 0) {
          this.setState({ showLoadMoreBtn: false });
          Notiflix.Notify.failure(
            'К сожалению, нет изображений, соответствующих вашему поисковому запросу. Пожалуйста, попробуйте еще раз.',
            notifySettings
          );
          return;
        } else {
          this.setState(prevState => ({
            picsArr: [...prevState.picsArr, ...picsArr],
          }));
        }

        if (picsArr.length > 0 && this.state.page === 1) {
          Notiflix.Notify.success(
            `Поздравляем, мы нашли всего ${total} картинок.`, notifySettings
          );
        }
       picsLeft > 0
          ? this.setState({ showLoadMoreBtn: true })
          : this.setState({ showLoadMoreBtn: false });
      });
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure(
        'Что-то пошло не так, попробуйте ещё раз.',
        notifySettings
      );
    } finally {
      this.setState({ isLoading: false });
    }
  }

  toggleModal = (largeImageURL, imageTags) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL: largeImageURL,
      imageTags: imageTags,
    }));
  };

  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />

         <ImageGallery
            pics={this.state.picsArr}
            showModal={this.toggleModal}
          />

          {this.state.showLoadMoreBtn && (
            <Button
              text="Load more"
              status="load"
              onClick={this.onLoadMoreBtnClick}
              onLoaderPlay={this.state.isLoading}
            />
          )}
        
        {this.state.isLoading && <Loader />}

        {this.state.showModal && (
          <Modal
            src={this.state.largeImageURL}
            alt={this.state.imageTags}
            closeModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}



// export class App extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     currentSearch: '',
//     pageNr: 1,
//     modalOpen: false,
//     modalImg: '',
//     modalAlt: '',
//   };

//   // handleSubmit = name => {
//   //   if (this.state.name === name) {
//   //     return alert (`Вы уже просматриваите ${name}`);
//   //   }
//   //       //const response = fetchImages(inputForSearch.value, 1);
//   //   this.setState({
//   //     name: name.toLowerCase(),
//   //     image: [],
//   //     page: 1
//   //   });
//   // };

//   handleSubmit = async e => {
//     e.preventDefault();
//     this.setState({ isLoading: true });
//     const inputForSearch = e.target.elements.inputForSearch;
//     if (inputForSearch.value.trim() === '') {
//       return;
//     }
//     const response = await fetchImages(inputForSearch.value, 1);
//     this.setState({
//       images: response,
//       isLoading: false,
//       currentSearch: inputForSearch.value,
//       pageNr: 1,
//     });
//   };

//   handleClickMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1 }));
//   };

//   // handleClickMore = async () => {
//   //   const response = await fetchImages(
//   //     this.state.currentSearch,
//   //     this.state.pageNr + 1
//   //   );
//   //   this.setState({
//   //     images: [...this.state.images, ...response],
//   //     pageNr: this.state.pageNr + 1,
//   //   });
//   // };

//   handleImageClick = e => {
//     this.setState({
//       modalOpen: true,
//       modalAlt: e.target.alt,
//       modalImg: e.target.name,
//     });
//   };

//   handleModalClose = () => {
//     this.setState({
//       modalOpen: false,
//       modalImg: '',
//       modalAlt: '',
//     });
//   };

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.handleModalClose();
//     }
//   };

//   // componentDidUpdate (prevProps, prevState){
//   //   if (
//   //     prevState.name !== this.state.name ||
//   //     prevState.page !== this.state.page
//   //   ) {
//   //     this.setState({loading: true});
//   //     fetch(
//   //       `https://pixabay.com/api/?q=${this.state.name}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
//   //     )
//   //     .then(response => responce.json())
//   //     .then(image => {
//   //       if (!image.total){
//   //         return alert (`К сожалению по Вашему запросу ничего не найдено`);
//   //       }
//   //       this.setState(prevState => ({
//   //         image: [...prevState.image, ...image.hits],
//   //         totalImages: image.total,
//   //       }));
//   //     })
//   //     .catch(error => error)
//   //     .finally(() =>{
//   //       this.setState({loading: false});
//   //     });
//   //   }
//   // }


//   async componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   render() {
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//       <Searchbar onSubmit={this.onSubmit} />

//             <ImageGallery
//               onImageClick={this.handleImageClick}
//               images={this.state.images}
//             />
//             {this.state.images.length > 0 ? (
//               <Button onClick={this.handleClickMore} />
//             ) : null}
      
//         {this.state.isLoading && <Loader />}

// {this.state.showModal && (
//   <Modal
//     src={this.state.largeImageURL}
//     alt={this.state.imageTags}
//     closeModal={this.toggleModal}
//   />
// )}
//       </div>
//     );
//   }
// }
