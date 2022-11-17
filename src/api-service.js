export default class ApiService {
  constructor() {
    this.searchQuery = '';
  }
  fetchGallely() {
    console.log(this);
    const url =
      'https://pixabay.com/api/?key=31283417-a6085b694485a4758f88c734b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1';
    fetch(url)
      .then(response => response.json())
      .then(console.log);
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
