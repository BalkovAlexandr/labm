import './index.html';
import './index.css';
import User from './components/User'
import Popup from './components/Popup';
import { 
  cardsContainer, 
  cleanFilterBtn, 
  filterRating, 
  filterRegistrationDate, 
  searchInput, 
  paginationEl,
  buttonDelete 
} from './utils/constants';
import { 
  search, 
  sortByDate, 
  sortById, 
  sortByRating 
} from './utils/utils';

let usersList = []

const popup = new Popup()
popup.setEventListeners()

filterRating.addEventListener('click', () => {
  cleanFilterBtn.style.display = 'block'
  if (filterRating.classList.contains('filter-buttons__button_active')) {
    cardsContainer.innerHTML = ''
    pagination(usersList.reverse())
    search(usersList)
    return
  }
  filterRating.classList.add('filter-buttons__button_active')
  filterRegistrationDate.classList.remove('filter-buttons__button_active')
  cardsContainer.innerHTML = ''
  pagination(sortByRating(usersList))
  search(usersList)
})

filterRegistrationDate.addEventListener('click', () => {
  cleanFilterBtn.style.display = 'block'
  if (filterRegistrationDate.classList.contains('filter-buttons__button_active')) {
    cardsContainer.innerHTML = ''
    pagination(usersList.reverse())
    search(usersList)
  } else {
    filterRegistrationDate.classList.add('filter-buttons__button_active')
    filterRating.classList.remove('filter-buttons__button_active')
    cardsContainer.innerHTML = ''
    pagination(sortByDate(usersList))
    search(usersList)
  }
})

cleanFilterBtn.addEventListener('click', () => {
  filterRegistrationDate.classList.remove('filter-buttons__button_active')
  filterRating.classList.remove('filter-buttons__button_active')
  searchInput.value = ''
  cardsContainer.innerHTML = ''
  cleanFilterBtn.style.display = 'none'
  pagination(sortById(usersList))
  search(usersList)
})

document.addEventListener('keyup', () => {
  pagination(search(usersList))
  if (searchInput.value !== '' || 
    (filterRegistrationDate.classList.contains('filter-buttons__button_active') || 
    filterRating.classList.contains('filter-buttons__button_active'))) {
    cleanFilterBtn.style.display = 'block'
  } else {
    cleanFilterBtn.style.display = 'none'
  }
})


Promise.all([getUsers()])
  .then(res => pagination(usersList))
  .catch((err) => {
    console.log(err);
  });

function createUser(user) {
  const card = new User(user, handleDeleteClick, '.user-template')
  const cardElement = card.generateCard()

  return cardElement
}

function handleDeleteClick(card, id) {
  handlePopupConfirm(card, id)
  popup.open()
}

function handlePopupConfirm(card, id) {
  buttonDelete.addEventListener('click', () => {
    card.removeCard()
    usersList = [...usersList.filter(item => item['id'] !== id)]
    popup.close()
    pagination(usersList)
  })
}

function renderUsers(users) {
  users.forEach(user => {
    cardsContainer.append(createUser(user))
  })
}

async function getUsers() {
  let response = await fetch('https://5ebbb8e5f2cfeb001697d05c.mockapi.io/users')
  let users = await response.json()
  usersList.push(...users)
  return users
}

  function pagination(usersList) {
    const postsData = usersList
    let currentPage = 1
    let rows = 5
  
    function displayList(postsData, rowPerPage, page) {
      cardsContainer.innerHTML = ''
      page--
  
      const start = rowPerPage * page
      const end = start + rowPerPage
      const paginatedData = postsData.slice(start, end)
  
      renderUsers(paginatedData)
    }
  
    function displayPagination(postsData, rowPerPage) {
      paginationEl.innerHTML = ''
      const pagesCount = Math.ceil(postsData.length / rowPerPage)
      const ulEl = document.createElement('ul')
      ulEl.classList.add('pagination__list')
  
      for (let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1)
        ulEl.appendChild(liEl)
      }
      paginationEl.appendChild(ulEl)
    }
  
    function displayPaginationBtn(page) {
      const liEl = document.createElement('li')
      liEl.classList.add('pagination__item')
      liEl.innerText = page
      if (currentPage === page) {
        liEl.classList.add('pagination__item_active')
      }
  
      liEl.addEventListener('click', () => {
        currentPage = page
        displayList(postsData, rows, currentPage)
        let currentItemLi = document.querySelector('li.pagination__item_active')
        currentItemLi.classList.remove('pagination__item_active')
  
        liEl.classList.add('pagination__item_active')
      })
  
      return liEl
    }
  
    displayList(postsData, rows, currentPage)
    displayPagination(postsData, rows)
  }