export default class Popup {
  constructor() {
    this._popup = document.querySelector('.popup')
    this._popupDeleteButton = this._popup.querySelector('.popup__btn-delete')
    this._popupCloseButton = this._popup.querySelector('.popup__btn-close')
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_active')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_active')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlePopupClick(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.close());
    this._popup.addEventListener("mousedown", (evt) => this._handlePopupClick(evt));
  }

}

