import { fetchBreeds, fetchCatByBreed } from './cat-ip';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const bodyEl = document.querySelector('body');
const refs = {
  selectEl: findRef(bodyEl.children, 'breed-select'),
  loaderEl: findRef(bodyEl.children, 'wrapper-loader'),
  errorEl: findRef(bodyEl.children, 'error'),
  infoEl: findRef(bodyEl.children, 'cat-info'),
};

hideElement(refs.errorEl, refs.selectEl);

window.addEventListener('load', onLoad);
refs.selectEl.addEventListener('change', onSelect);

function onLoad() {
  fetchBreeds('/breeds')
    .then(data => {
      refs.selectEl.innerHTML = '<option value="" disabled selected>Choose your cat...</option>' + data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
      new SlimSelect({
        select: '.breed-select',
      });
      hideElement(refs.loaderEl, refs.selectEl);
    })
    .catch(() =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    );
}

function onSelect(e) {
  fetchCatByBreed('images/search', e.target.value)
    .then(resp => {
      refs.infoEl.innerHTML = createMarkupInfo(resp[0]);
      refs.infoEl.style.display = 'flex';
      refs.infoEl.style.gap = '30px';
      refs.infoEl.style.backgroundColor = 'rgba(175, 207, 249, 0.503)';
    })
    .catch(() =>
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
    );
}

function createMarkupInfo({ url, breeds }) {
  const { name, temperament, description } = breeds[0];
  return `<img src="${url}" alt="${name}" width = 450>
      <div><h2>Breed: ${name}</h2>
      <h3>Temperament: ${temperament}</h3>
      <h4>Description</h4>
      <p>${description}</p></div>`;
}

function hideElement(...elems) {
  elems.forEach(i => i.classList.toggle('hidden'));
}

function findRef(queryEl, classN) {
  return [...queryEl].find(i => i.className === classN);
}
