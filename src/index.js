import './css/styles.css';
import ApiService from './src/api-service';
// import axios from 'axios';
const refs = {
  formRef: document.querySelector('#search-form'),
  inputRef: document.querySelector('[name ="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtnRef: document.querySelector('.load-more'),
};
refs.formRef.addEventListener('submit', onSubmitForm);
refs.loadMoreBtnRef.addEventListener('click', onLoadMore);

const apiService = new ApiService();
// console.log(apiService);
function onSubmitForm(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.query.value;
  apiService.fetchGallely(searchQuery);
  apiService.resetPage();
}
function onLoadMore() {
  apiService.fetchGallely(searchQuery);
}
