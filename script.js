// Selecting HTML elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const convertButton = document.getElementById('convert-btn');
const resetButton = document.getElementById('reset-btn');
const resultElement = document.getElementById('result');

// Function to convert currency
const convertCurrency = async () => {
  const amount = amountInput.value;
  const fromCurrency = fromCurrencySelect.value.toUpperCase();
  const toCurrency = toCurrencySelect.value.toUpperCase();

  // Input validation
  if (isNaN(amount) || amount <= 0) {
    resultElement.textContent = 'Please enter a valid positive amount.';
    return;
  }

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

// Function to reset input fields and result
const resetFields = () => {
  amountInput.value = '';
  fromCurrencySelect.selectedIndex = 0;
  toCurrencySelect.selectedIndex = 0;
  resultElement.textContent = '';
};

// Event listeners for buttons
resetButton.addEventListener('click', resetFields);
convertButton.addEventListener('click', convertCurrency);