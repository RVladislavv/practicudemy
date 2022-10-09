"use script.js";

//пример с рекурсией - возведение в степень
function pow(x, n) {
    //база рекурсии к чему сводится
    if(n === 1) {
        return x;
    } else {
        //n-1 - шаг рекурсия
        //n - глубина рекурсии
        return x * pow(x, n - 1);
    }
}

console.log(pow(2, 8));

//перебор объекта и массива в глубину
function getTotalProgressByRecursion(data) {
    if(Array.isArray(data)) {
        let total = 0;
        for(let i = 0; i < data.length; i++) {
            total += data[i].progress;
        }

        return [total, data.length];
    } else {
        let total = [0, 0];

        for (let subData of Object.values(data)) {
            const subDataArr = getTotalProgressByRecursion(subData);
            total[0] += subDataArr[0];
            total[1] += subDataArr[1];
        }

        return total;
    }
}
let students = 0;
const result = getTotalProgressByRecursion(students);

console.log(result[0]/result[1]);