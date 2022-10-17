"use script";
window.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';
            //вариант без инлайн стайл
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }   
    
    function showTabContent(i = 0) {
        //tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    //тут не обязателен аргумент, так как сделал аргумент по умолчанию
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2022-10-14';
    //сделать функцию разницы времени(куда будем передавать дедлайн) - разница в миллисекундах считать
    //далее эти мс разбить на дни, часы, минуты, секунды
    //вернуть можно объект, где ключ-значение, которые потом использовать будем
    //после делаем новую функцию - которая будет уже выводить данные
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); //получим мс до дедлайна
            
            if(t <= 0) {
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            } else {
                days = Math.floor(t / (1000 * 60 *60 *24));
                hours = Math.floor((t / (1000 * 60 * 60) % 24));
                minutes = Math.floor((t / 1000 / 60) % 60);
                seconds = Math.floor((t / 1000) % 60);
            }

            

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();


        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        //modal.classList.toggle('show'); - тогда надо будет убрать класс hide у modal
        document.body.style.overflow = 'hidden';
        //если пользователь сам открыл - то убираем открытие через время
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        //modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    //реализация закрытия модуля, при клике вне модуля
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });

    //закрытие модального окна по клавише Escape
    document.addEventListener('keydown', (e) => {
        //закрытие будет при нажатии клавиши эскейпт и при открытом модальном окне
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //открытие модального окна через время
    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        //проверка, что долистал до конца страницы
        //прокрученная часть + видимая часть(в данный момент) >= высоты всего сайта - 1px(чтоб наверняка)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            //удаляем обработчик событий, чтоб не открывалось модульное окно при каждом прокруте до конца страницы
            window.removeEventListener('scroll', showModalByScroll);
        }
    }



    //открытие мод окна, когда пользователь долистал до конца
    window.addEventListener('scroll', showModalByScroll);


    //классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); //используется метод описаный ниже, для конвертации валюты
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        //генерирование вёрстки HTML
        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu_item';
                element.classList.add();
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
        'menu__item'
    ).render();
    
});