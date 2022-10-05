/* Задание на урок:
1) Автоматизировать вопросы пользователю про фильмы при помощи цикла
2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит - 
возвращаем пользователя к вопросам опять. (К любой строке можно обратиться как 
str.length - и получить её длину)
3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"
4) Потренироваться и переписать цикл еще двумя способами*/

'use strict';

let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};


let countQuestions = 0;
for(let i = 0; i < 2; i++) {
    let lastF = prompt('Один из последних просмотренных фильмов?');
    let filmRating = prompt('На сколько оцените его?');
    if(lastF != '' && filmRating != '' && lastF != null && filmRating != null && lastF.length < 50 && filmRating < 50) {
        personalMovieDB.movies[lastF] = filmRating;
    } else {
        i--;
        console.log('Error');
    }
}


let message = '';
if(personalMovieDB.count < 10) {
    message = "Просмотрено довольно мало фильмов";
}
if(personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    message = "Вы классический зритель";
}
if(personalMovieDB.count >= 30) {
    message = "Вы киноман";
}
if(message == '') {
    message = "Произошла ошибка";
}

console.log(message);
console.log(personalMovieDB);