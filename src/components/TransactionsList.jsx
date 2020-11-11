import React, { useEffect, useState } from "react"
import axios from "axios"

export default function TransactionsList({ year, month }) {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`https://finances-api-md.herokuapp.com/api/transaction?period=${year}-${month}`)
            .then(ts => setList(ts.data))
            .catch(e => console.log(e))
            .finally(() => setLoading(false))

    }, [year, month])

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
            {loading && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> || <ul>{list.map(item => renderLine(item))}</ul>}
        </div>
    )
}