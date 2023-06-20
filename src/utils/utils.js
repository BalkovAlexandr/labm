import {options} from './constants' 

export function getDate(str) {
  const date = new Date(str);
  return date.toLocaleString('ru', options)
}

export function sortByRating(arr) {
  return arr.sort((a, b) => a['rating'] > b['rating'] ? 1 : -1)
}

export function sortByDate(arr) {
  return arr.sort((a, b) => a['registration_date'] > b['registration_date'] ? 1 : -1)
}

export function sortById(arr) {
  return arr.sort((a, b) => a['id'] > b['id'] ? 1 : -1)
}

export function search(arr) {
  let newArr = []
  let input = document.querySelector('.search-container__input')
  let filter = input.value.toLowerCase()
  arr.forEach(item => {
    if (item.username.toLowerCase().includes(filter) || item.email.toLowerCase().includes(filter)) {
      newArr.push(item)
    }
  })
  return newArr
}



