const api = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

var searchValue = document.getElementById("searchValue");
var reset = document.getElementById("reset");
var swapCurrency = document.getElementById("swapCurrency");
var fromCurrecy = document.getElementById("from");
var toCurrecy = document.getElementById("to");
var finalValue = document.getElementById("finalValue");
var resultFrom;
var resultTo;

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
