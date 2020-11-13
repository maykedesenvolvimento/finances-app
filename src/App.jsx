import React, { useState, useEffect } from "react"
import TransactionsList from "./components/TransactionsList"
import Transaction from "./components/Transaction"

export default function App() {
  const [current, setCurrent] = useState(null)
  const [dates, setDates] = useState([])
  const [arg, setArg] = useState("")
  const [editing, setEditing] = useState(false)
  const [id, setId] = useState("")

  useEffect(() => {
    const y = new Date().getFullYear()
    const periods = []

    for (let i = -1; i <= 1; i++) {
      for (let j = 1; j <= 12; j++) {
        periods.push({ year: y + i, month: j })
      }
    }
    setCurrent(periods.findIndex(p => p.month === new Date().getMonth() && p.year === y))
    setDates(periods)
  }, [])

  const changeCurrent = (event) => {
    setCurrent(event.target.value)
    setEditing(false)
  }
  const changeArg = (event) => setArg(event.target.value)
  const callBack = (val) => {
    setEditing(val ? true : false)
    if (val) setId(val)
  }

  const handleClick = (event) => {
    const cont = (event.target.innerHTML === "&lt;") ? current - 1 : current + 1

    if (cont >= 0 && cont < dates.length) {
      setCurrent(cont)
      setEditing(false)
    }
  }

  return (
    <div className="app">
      <header>
        <h3>Controle financeiro</h3>
        <div className="calendar">
          <p>Período: </p>
          <div>
            <button onClick={handleClick}>{'<'}</button>
            <select onChange={changeCurrent} value={current || 0}>
              {dates.map((d, index) => <option key={index} value={index}>{`${d.year}/${d.month}`}</option>)}
            </select>
            <button onClick={handleClick}>{'>'}</button>
          </div>
        </div>
        <div className="search">
          <input type="text" onChange={changeArg} value={arg} disabled={editing} />
          <button onClick={() => {
            setId("")
            setEditing(true)
          }} disabled={editing}>Adicionar</button>
        </div>
      </header>
      <main>{
        editing &&
        <Transaction callBack={callBack} id={id} /> ||
        current &&
        <TransactionsList year={dates[current]?.year} month={dates[current]?.month} arg={arg} callBack={callBack} />
      }</main>
    </div>
  )
}
