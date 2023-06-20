import { getDate } from "../utils/utils";

export default class User {
  constructor(data, handleDeleteClick, templateSelector) {
    this._username = data.username;
    this._email = data.email;
    this._registration_date = data.registration_date;
    this._rating = data.rating;
    this._id = data.id
    this._templateSelector = templateSelector
    this._handleDeleteClick = handleDeleteClick
  }

  _getTemplate() {
    const userCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.user-card')
    .cloneNode(true)

    return userCard
  }

  generateCard() {
    this._element = this._getTemplate()

    this._element.querySelector('.user-card__name').textContent = this._username
    this._element.querySelector('.user-card__email').textContent = this._email
    this._element.querySelector('.user-card__registration-date').textContent = getDate(this._registration_date)
    this._element.querySelector('.user-card__rating').textContent = this._rating
    this._deleteButton = this._element.querySelector('.user-card__delete')

    this._setEventListeners()
    return this._element
  }

    removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this, this._id))
  }
}