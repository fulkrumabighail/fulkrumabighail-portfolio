const inputNumber = document.getElementById('arabic-number');
const convertRomanBtn = document.getElementById('convertRoman-btn');
const romanOutput = document.getElementById('roman-output');

convertRomanBtn.addEventListener('click', () => {
    if (inputNumber.value === '') {
        romanOutput.innerText = 'Please enter a valid number';
        return;
    }else if (inputNumber.value < 0) {
        romanOutput.innerText = 'Please enter a number greater than or equal to 1';
        return;
    }else if (inputNumber.value > 3999) {
        romanOutput.innerText = 'Please enter a number less than or equal to 3999';
        return;
    }else{
        convertToRoman(inputNumber.value);
        romanOutput.innerText = convertToRoman(inputNumber.value);
    }
});


const convertToRoman = (num) => {
    const romanNumerals = [

        [1, 'I'],
        [4, 'IV'],
        [5, 'V'],
        [9, 'IX'],
        [10, 'X'],
        [40, 'XL'],
        [50, 'L'],
        [90, 'XC'],
        [100, 'C'],
        [400, 'CD'],
        [500, 'D'],
        [900, 'CM'],
        [1000, 'M']
    ];
    let roman = "";
    for(let [value,symbol] of romanNumerals.reverse()){
        if(num===0)break;
        let count = Math.floor(num / value);
        roman += symbol.repeat(count);
        num -= value*count
    }
    return roman
};