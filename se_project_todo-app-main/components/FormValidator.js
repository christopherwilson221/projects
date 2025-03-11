class FormValidator {
    constructor (settings, formEl){
        this._inputSelector = settings.inputSelector ;
        this._submitButtonSelector = settings.submitButtonSelector ;
        this._errorClass = settings.errorClass ;
        this._inputErrorClass = settings.inputErrorClass ;
        this._inactiveButtonClass = settings.inactiveButtonClass ;
        this._formEl = formEl;
        this.inputList = Array.from(
         this._formEl.querySelectorAll(this._inputSelector),);
        this.buttonElement = this._formEl.querySelector(
            this._submitButtonSelector,
          );
    }

    resetValidation() {
        this.inputList.forEach((inputElement) => {
          this.hideInputError(inputElement);
        });
        this._formEl.reset();
        this.toggleButtonState();
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

    toggleButtonState = () => {
        if (this._hasInvalidInput(this.inputList)) {
          this.buttonElement.classList.add(this._inactiveButtonClass);
          this.buttonElement.disabled = true;
        } else {
          this.buttonElement.classList.remove(this._inactiveButtonClass);
          this.buttonElement.disabled = false;
        }
      };

    _setEventListeners(){
        this.toggleButtonState();
        
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this.toggleButtonState();
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

export default FormValidator;