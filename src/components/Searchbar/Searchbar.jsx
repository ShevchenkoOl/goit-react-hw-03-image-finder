import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';
import { notifySettings } from 'Api/Api';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = event => {
    const query = event.currentTarget.value;
    this.setState({ query: query });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState({ query: '' });
    
    
    if (this.state.query === event) 
    {
      return Notiflix.Notify.success(
        `Вы уже просматриваете ${this.state.query}.`,
       notifySettings
      );
    }
// this.setState({query:event.toLowerCase(), pics:[], page:1})
    
}
   
// handleSubmit = event => {
// if (this.state.query === event) 
//     {
//       return Notiflix.Notify.success(
//         `Вы уже просматриваете ${this.state.query}.`,
//        notifySettings
//       );
//     }
// this.setState({query:event.toLowerCase(), pics:[], page:1})
//   }
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            value={this.state.query}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
