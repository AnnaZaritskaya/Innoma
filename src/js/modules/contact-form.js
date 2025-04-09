// src/js/modules/contact-form.js

export class PhoneInput {
    constructor(container) {
        this.container = container;
        this.flagDisplay = container.querySelector('.contact-form__flag-selected');
        this.flagDropdown = container.querySelector('.contact-form__flag-dropdown');
        this.flagItems = container.querySelectorAll('.contact-form__flag-item');
        this.phoneInput = container.querySelector('.contact-form__input--phone');

        // Отладка: проверяем, что элементы найдены
        console.log('Инициализация PhoneInput');
        console.log('container:', container);
        console.log('flagDisplay:', this.flagDisplay);
        console.log('flagDropdown:', this.flagDropdown);
        console.log('flagItems count:', this.flagItems.length);
        console.log('phoneInput:', this.phoneInput);

        if (!this.flagDisplay || !this.flagDropdown || !this.flagItems.length || !this.phoneInput) {
            console.error('Не найдены необходимые элементы для PhoneInput', container);
            return;
        }

        this.isDropdownVisible = false;
        this.init();
    }

    init() {
        console.log('Запуск init для PhoneInput');

        // Открытие/закрытие выпадающего списка при клике на флаг
        this.flagDisplay.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем возможное влияние формы
            console.log('Клик по flagDisplay');
            this.toggleDropdown();
        });

        // Обработка клика по флагу в списке
        this.flagItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем закрытие списка из-за внешнего обработчика
                const code = item.getAttribute('data-code');
                const country = item.getAttribute('data-country');
                const src = item.src;
                const alt = item.alt;

                console.log('Выбран флаг:', { code, country, src, alt });

                // Обновляем выбранный флаг
                this.flagDisplay.src = src;
                this.flagDisplay.alt = alt;

                // Обновляем код в инпуте
                let currentNumber = this.phoneInput.value.replace(/^\+\d+/, '');
                this.phoneInput.value = code + currentNumber;

                // Скрываем список после выбора
                this.hideDropdown();
            });
        });

        // Закрытие списка при клике вне его
        document.addEventListener('click', (e) => {
            if (!this.flagDropdown.contains(e.target) && !this.flagDisplay.contains(e.target)) {
                console.log('Клик вне dropdown, скрываем');
                this.hideDropdown();
            }
        });

        // Обратное обновление при ручном вводе кода
        this.phoneInput.addEventListener('input', () => {
            const value = this.phoneInput.value;
            const codeMatch = value.match(/^\+(\d+)/);

            if (codeMatch) {
                const code = '+' + codeMatch[1];
                const flagItem = Array.from(this.flagItems).find(
                    item => item.getAttribute('data-code') === code
                );

                if (flagItem) {
                    console.log('Обновление флага по вводу:', code);
                    this.flagDisplay.src = flagItem.src;
                    this.flagDisplay.alt = flagItem.alt;
                }
            }
        });

        // Форматирование номера телефона
        this.phoneInput.addEventListener('input', (e) => {
            let value = e.target.value;
            value = value.replace(/[^\d+]/g, '');
            e.target.value = value;
        });
    }

    toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
        console.log('Переключение dropdown, visible:', this.isDropdownVisible);
        this.flagDropdown.classList.toggle('contact-form__flag-dropdown--visible', this.isDropdownVisible);
        console.log('Классы flagDropdown:', this.flagDropdown.classList); // Проверяем, применился ли класс
    }

    hideDropdown() {
        this.isDropdownVisible = false;
        this.flagDropdown.classList.remove('contact-form__flag-dropdown--visible');
        console.log('Скрытие dropdown, классы:', this.flagDropdown.classList);
    }
}

export function initPhoneInputs() {
    const phoneWrappers = document.querySelectorAll('.contact-form__wrapper');
    console.log('Найдено phoneWrappers:', phoneWrappers.length);
    phoneWrappers.forEach(wrapper => {
        new PhoneInput(wrapper);
    });
}