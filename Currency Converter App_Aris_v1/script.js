const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertButton = document.getElementById('convert-btn');
const resetButton = document.getElementById('reset-btn');
const resultElement = document.querySelector('.result');

const convertCurrency = async () => {
  const amount = amountInput.value;
  const fromCurrency = fromCurrencySelect.value.toUpperCase(); // Ensure fromCurrency is uppercase
  const toCurrency = toCurrencySelect.value.toUpperCase(); // Ensure toCurrency is uppercase

  try {
    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_7iBYymugkH3PcBWqOD1sNnxFjYKjaBDVHqCrTjW9&currencies=USD,SGD,MYR,EUR,AUD&base_currency=${fromCurrency}`
    );

    const data = await response.json();
    console.log(data);

    const conversionRate = data.data[toCurrency].value;
    console.log(conversionRate);

    const convertedAmount = amount * conversionRate;
    resultElement.textContent = `${amount} ${fromCurrency.toUpperCase()} is equal to ${convertedAmount.toFixed(
      2
    )} ${toCurrency.toUpperCase()}`;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    resultElement.textContent = 'An error occurred during conversion.';
  }
};

const resetFields = () => {
  amountInput.value = '';
  fromCurrencySelect.value = 'usd';
  toCurrencySelect.value = 'usd';
  resultElement.textContent = '';
};

resetButton.addEventListener('click', resetFields);
convertButton.addEventListener('click', convertCurrency);