const api = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

let searchValue = document.getElementById("searchValue");
let reset = document.getElementById("reset");
let swapCurrency = document.getElementById("swapCurrency");
let fromCurrecy = document.getElementById("from");
let toCurrecy = document.getElementById("to");
let finalValue = document.getElementById("finalValue");
let resultFrom;
let resultTo;

fromCurrecy.addEventListener("change", getResults);
toCurrecy.addEventListener("change", getResults);

swapCurrency.addEventListener("click", function () {
  let tmp = fromCurrecy.value;
  fromCurrecy.value = toCurrecy.value;
  toCurrecy.value = tmp;
  getResults();
});

searchValue.oninput = function () {
  getResults();
};

function getResults() {
  fetch(`${api}`)
    .then((currency) => {
      return currency.json();
    })
    .then(displayResults);
}

function serachOperand(arr, element) {
  let tmp = 1;
  arr.forEach((el) => {
    if (element.value == el.ccy) {
      tmp = el.sale;
    }
  });
  return tmp;
}

function displayResults(currency) {
  let fromRate = serachOperand(currency, fromCurrecy);
  let toRate = serachOperand(currency, toCurrecy);
  finalValue.value = ((fromRate / toRate) * searchValue.value).toFixed(2);
}
