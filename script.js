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
    currencyValues: {},
    fetchCurrencies: async function(baseCurrency = 'USD') {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${this.accessKey}/latest/${baseCurrency}`)
        const data = await response.json()
        this.currencyValues = data.conversion_rates
    },
}

function createCurrencyOptions() {
    const currencies = Object.keys(exchangeRateApiInfo.currencyValues)
    
    currencies.forEach(currency => {
        const currencyOption1 = document.createElement('option')
        const currencyOption2 = document.createElement('option')
        currencyOption1.value = currencyOption2.value = currency
        currencyOption1.innerText = currencyOption2.innerText = currency
        initialCurrency.add(currencyOption1)
        finalCurrency.add(currencyOption2)
    })

    finalCurrency.value = 'EUR'
}

async function calcExchangeRate() {
    await exchangeRateApiInfo.fetchCurrencies(initialCurrency.value)
    const currencyValue2 = Number(initialCurrencyValue.value) * exchangeRateApiInfo.currencyValues[finalCurrency.value]

    const conversionRate = `${initialCurrencyValue.value} ${initialCurrency.value} = ${currencyValue2} ${finalCurrency.value}`
    rate.innerText = conversionRate
    finalCurrencyValue.innerText = currencyValue2
}

async function swapCurrencies() {
    const temp = initialCurrency.value
    initialCurrency.value = finalCurrency.value
    finalCurrency.value = temp
    calcExchangeRate()
}

async function main() {
    await exchangeRateApiInfo.fetchCurrencies()

    createCurrencyOptions()
    calcExchangeRate()

    // Events
    initialCurrency.addEventListener('change', calcExchangeRate)
    finalCurrency.addEventListener('change', calcExchangeRate)
    initialCurrencyValue.addEventListener('input', calcExchangeRate)
    swapButton.addEventListener('click', swapCurrencies)
}

main()