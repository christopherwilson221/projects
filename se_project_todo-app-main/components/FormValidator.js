class formValidator {
    constructor (settings, formEl){
        this._inputSelector = settings.inputSelector ;
        this._submitButtonSelector = settings.submitButtonSelector ;
        this._errorClass = settings.errorClass ;
        this._inputErrorClass = settings.inputErrorClass ;
        this._inactiveButtonClass = settings._inactiveButtonClass ;
        this._formEl = formEl;
    }

    resetValidation() {
        const inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );
          const buttonElement = this._formEl.querySelector(
            this._submitButtonSelector,
          );
        inputList.forEach((inputElement) => {
          this.hideInputError(inputElement);
        });
      
        this.toggleButtonState(inputList, buttonElement);
        this._formEl.reset();
      }

    showInputError = (inputElement, errorMessage) => {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
      };
      
    hideInputError = (inputElement) => {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = this._formEl.querySelector(errorElementId);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
      };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
          this.showInputError(
            inputElement,
            inputElement.validationMessage,
          );
        } else {
          this.hideInputError(inputElement);
        }
      };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      };

    toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._inactiveButtonClass);
          buttonElement.disabled = true;
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
        }
      };

    _setEventListeners(){
        const inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );
          const buttonElement = this._formEl.querySelector(
            this._submitButtonSelector,
          );
        
          this.toggleButtonState(inputList, buttonElement);
        
          inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this.toggleButtonState(inputList, buttonElement);
            });
          });
    }


    enableValidation(){
        this._formEl.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners();
    }
}

export default formValidator;