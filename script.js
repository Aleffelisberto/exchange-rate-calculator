// Create variables to get the necessary DOM elements
const initialCurrency = document.getElementById('initial-currency')
const finalCurrency = document.getElementById('final-currency')
const initialCurrencyValue = document.getElementById('initial-value')
const finalCurrencyValue = document.getElementById('final-value')
const swapButton = document.getElementById('swap-button')
const rate = document.getElementById('rate')

// Object to handle API requests and responses
const exchangeRateApiInfo = {
    accessKey: '7e063b53977016d87f39a65e',
    fetchCurrencies: function(baseCurrency) {
        fetch(`https://v6.exchangerate-api.com/v6/${this.accessKey}/latest/USD`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('No currency found')
            }
        })
        .then(data => this.createCurrencyOptions(data))
        .catch(err => {
            throw err
        })
    },
    createCurrencyOptions: function(data) {
        const {conversion_rates} = data
        const currencies = Object.keys(conversion_rates)
        
        currencies.forEach(currency => {
            const currencyOption1 = document.createElement('option')
            const currencyOption2 = document.createElement('option')
            currencyOption1.value = currencyOption2.value = currency
            currencyOption1.innerText = currencyOption2.innerText = currency
            initialCurrency.add(currencyOption1)
            finalCurrency.add(currencyOption2)
        })
    }
}

exchangeRateApiInfo.fetchCurrencies('USD')