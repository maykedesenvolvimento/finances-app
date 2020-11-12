import React, { useEffect, useState } from "react"
import http from "../http-common"

export default function TransactionsList({ year, month, arg }) {
    const [list, setList] = useState([])
    const [filtered, setFiltered] = useState([])
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState({
        incomes: 0,
        expanses: 0
    })

    useEffect(() => {
        setLoading(true)
        http
            .get(`api/transaction?period=${year}-${month}`)
            .then(ts => setList(ts.data))
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }, [month, year])

    useEffect(() => {
        setFiltered(list.filter(item => item.description.toLowerCase().includes(arg)))
        const incomes = list.filter(item => item.type === '+').reduce((acc, val) => acc + val.value, 0)
        const expanses = list.filter(item => item.type === '-').reduce((acc, val) => acc + val.value, 0)
        setBalance({ incomes, expanses })
    }, [arg, list])

    const renderLine = (data) => {
        return (
            <li key={data._id}>
                <p className="category">{data.category}</p>
                <p className="description">{data.description}</p>
                <p className={`value ${(data.type === '+') ? 'positive' : 'negative'}`}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.value)}</p>
            </li>
        )
    }

    return (
        <div className="center">
            {loading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> || <ul>{filtered.map(item => renderLine(item))}</ul>}
        </div>
    )
}