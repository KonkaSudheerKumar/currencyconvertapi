const BASE_URL =
  "https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    
    // Fetching data based on the selected from currency
    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const response = await fetch(url);
    const data = await response.json();
  
    // Accessing the USD data
    const fromCurrencyData = data[fromCurr.value.toLowerCase()];
  
    // Getting the exchange rate for the selected 'to' currency
    const toCurrency = toCurr.value.toLowerCase();
  
    // Check if the currency exists
    if (fromCurrencyData[toCurrency] !== undefined) {
      const exchangeRate = fromCurrencyData[toCurrency];
      console.log(`Exchange rate from ${fromCurr.value} to ${toCurr.value}:`, exchangeRate);
      
      // Optionally, if you want to convert the amount
      const convertedAmount = amtVal * exchangeRate;
      msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`;
    } else {
      msg.innerText = `Currency not found in the response: ${toCurrency}`;
    }
  };
  
 
  

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});