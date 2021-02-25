import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function App() {
  const [currency, setCurrencyConversion] = useState({ rates: {} })

  const [amount, setAmount] = useState(0)

  useEffect(async () => {
    const resp = await axios.get('https://api.ratesapi.io/api/latest?base=USD')
    setCurrencyConversion(resp.data)
  }, [])

  useEffect(() => {
    console.log(currency)
  }, [currency])

  let optionItems = Object.entries(currency.rates).map(
    ([currencyCode, currencyDetails]) => {
      return (
        <option>
          {' '}
          {currencyCode}:{(currencyDetails * amount).toFixed(2)}
        </option>
      )
    }
  )

  return (
    <div>
      <h1>Unit Conversion</h1>
      <h2>
        {' '}
        USD:
        <input
          type="number"
          placeholder="Enter value"
          value={amount}
          onChange={function (event) {
            setAmount(event.target.value)
          }}
        />
      </h2>
      <h2>Conversion Options:</h2>
      <select>{optionItems}</select>
    </div>
  )
}
