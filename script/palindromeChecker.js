const inputText = document.getElementById("text-input");
const resultText = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");


// regex for clearing other than alphanumeric
function clearString(str){
    const regex= /[\s\W_]/g;
    return str.replace(regex,"");
}
// checking palindrome
function checkPalindrome() {
    // clearing non alphanumeric
    let text = clearString(inputText.value.toLowerCase());
    // single char mean palindrome
    if (text.length === 1) {
        return true;
    }
    // checking char each iteration until the middle of string
    for(let i = 0; i<Math.floor(text.length/2);i++){
        if(text[i]!==text[text.length-1-i]){
           return false;
        }
    };
    // if passed means palindrome
    return true;
};

// checking text with checkPalindrome
function checkText() {
    if (inputText.value === "") {
        alert("Please input a value");
        return;
    }
    const palindrome = checkPalindrome(inputText)
    if (palindrome) {
        resultText.innerText = inputText.value + " is a Palindrome";
    } else {
        resultText.innerText = inputText.value + " is not a palindrome";
    }
    console.log(palindrome);
    resultText.classList.remove("hide");
};

checkBtn.addEventListener("click",checkText)