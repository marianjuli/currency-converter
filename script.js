async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (!amount || isNaN(amount)) {
        alert("Please enter a valid amount.");
        return;
    }

    if (!fromCurrency || !toCurrency) {
        alert("Please select both currencies.");
        return;
    }

    try {
        // Fetch exchange rate data from ExchangeRate-API
        const response = await fetch(`https://v6.exchangerate-api.com/v6/71910cf7ed129c17db498e33/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === "error") {
            alert("Error fetching exchange rates. Please try again later.");
            return;
        }

        // Retrieve the conversion rate from the response
        const exchangeRate = data.conversion_rates[toCurrency];
        const result = (amount * exchangeRate).toFixed(2);

        document.getElementById('result').innerText = 
            `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        alert("Error fetching exchange rates. Please try again later.");
        console.error(error);
    }
}

