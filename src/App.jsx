import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function App() {
  const [currency, setCurrencyConversion] = useState({ rates: {} })

  const [amount, setAmount] = useState(0)

  // let userOptions = Object.entries(currency.rates).map(([currencyCode]) => {
  //   return <option key={currencyCode}> {currencyCode}</option>
  // })

  useEffect(async () => {
    const resp = await axios.get(`https://api.ratesapi.io/api/latest?base=USD`)
    setCurrencyConversion(resp.data)
  }, [])

  let optionItems = Object.entries(currency.rates).map(
    ([currencyCode, currencyDetails]) => {
      return (
        <option key={currencyCode}>
          {' '}
          {currencyCode}:{(currencyDetails * amount).toFixed(2)}
        </option>
      )
    }
  )

  return (
    <div>
      <h1>Unit Conversion</h1>
      {/* <select>{userOptions}</select> */}
      <h2>
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
