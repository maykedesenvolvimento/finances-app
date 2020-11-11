import React, {useState, useEffect} from "react"
import TransactionsList from "./components/TransactionsList"

export default function App() {
  const [current, setCurrent] = useState(0)
  const [dates, setDates] = useState([])
  
  useEffect(() => {
    const y = new Date().getFullYear()
    const periods= []

    for(let i= -1; i<=1; i++) {
      for(let j= 1; j<=12; j++) {
        periods.push({year: y+i, month: j})
      }
    }
    setCurrent(periods.findIndex(p => p.month=== new Date().getMonth() && p.year=== y))
    setDates(periods)
  }, [])

  const handleChange= (event) => setCurrent(event.target.value)

  const handleClick = (event) => {
    const i = (event.target.innerHTML==="&lt;") ? -1 : 1
    let cont = current+i;
    if (cont<0) cont= 0
    else if (cont>35) cont= 35
    setCurrent(cont)
  } 

  return (
    <div className="app">
      <header className="center">
        <h3>Controle financeiro</h3>
        <div className="calendar">
          <button onClick={handleClick}>{'<'}</button>
          <select onChange={handleChange} value={current}>
            {dates.map((d, index) => <option key={index} value={index}>{`${d.year}/${d.month}`}</option>)}
          </select>
          <button onClick={handleClick}>{'>'}</button>
        </div>
      </header>
      <main>{current && <TransactionsList year={dates[current].year} month={dates[current].month}/>}</main>
    </div>
  )
}
