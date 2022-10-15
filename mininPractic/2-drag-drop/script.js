"use strict";
const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

item.addEventListener('dragstart', dragstart);
item.addEventListener('dragend', dragend);

for (const placeholder of placeholders) {
    //вызывается, когда элемент находится над элементов, куда можем поместить
    placeholder.addEventListener('dragover', dragover); 
    placeholder.addEventListener('dragenter', dragenter);//когда заходит на территорию места сброса
    placeholder.addEventListener('dragleave', dragleave);//когда вышли с территории
    placeholder.addEventListener('drop', dragdrop);//когда отпустили элемент
}

function dragstart(event) {
    event.target.classList.add('hold');
    setTimeout(() => 
    event.target.classList.add('hide'), 0); //способ, чтоб класс не преминился к объекту, который будут уже "взятым"
}

function dragend(event) {
    //event.target.classList.remove('hold', 'hide');
    event.target.className = 'item'; //альтернативный спосбо - оставит только один класс item

}

function dragover(event) {
    event.preventDefault(); //изначально не получится сбросить элемент - потому убираем это свойство

}

function dragenter(event) {
    event.target.classList.add('hovered');
}

function dragleave(event) {
    event.target.classList.remove('hovered');
}

function dragdrop(event) {
    event.target.classList.remove('hovered');
    event.target.append(item);
}