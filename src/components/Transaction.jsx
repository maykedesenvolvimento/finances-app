import React, { useState, useEffect } from "react"
import http from "../http-common"

export default function Transaction({ callBack, id }) {
    const [type, setType] = useState("+")
    const [form, setForm] = useState({
        description: "",
        category: "",
        value: 0,
        date: ""
    })

    useEffect(() => {
        if (id) {
            http.get(`api/transaction/${id}`)
                .then(res => {
                    setType(res.data.type)
                    const { description, category, value, yearMonthDay } = res.data
                    setForm({ description, category, value, date: yearMonthDay })
                })
        }
    }, [id])

    const changeType = (event) => setType(event.target.value)
    const handleChange = (field) => (event) => {
        setForm({ ...form, [field]: event.target.value })
        console.log(event.target.value)
    }

    const request = () => {
        const promise = (id) ? http.put(`api/transaction/${id}`, { ...form, type }) : http.post("api/transaction", { ...form, type })
        promise.then(() => callBack())
            .catch(e => console.log(e))
    }

    return (
        <div className="center">
            <div className="form">
                {
                    id &&
                    <h4>Editando {(form.type === "+") ? 'receita: ' : 'despesa: '}</h4> ||
                    <div>
                        <h4>Novo lançamento: </h4>
                        <div className="center">
                            <input type="radio" id="typePlus" value="+" checked={type === "+"} onChange={changeType} /> <label htmlFor="typePlus">Receita</label>
                            <input type="radio" id="typeMinus" value="-" checked={type === "-"} onChange={changeType} style={{ marginLeft: "1rem" }} /> <label htmlFor="typeMinus">Despesa</label>
                        </div>
                    </div>
                }


                <div className="center">
                    <label htmlFor="category">Categoria: </label>
                    <input type="text" id="category" value={form.category} onChange={handleChange("category")} />
                </div>
                <div className="center">
                    <label htmlFor="description">Descrição: </label>
                    <input type="text" id="description" value={form.description} onChange={handleChange("description")} />
                </div>
                <div className="center">
                    <label htmlFor="value">Valor: </label>
                    <input type="number" id="value" value={form.value} onChange={handleChange("value")} />
                </div>
                <div className="center">
                    <label htmlFor="date">Data: </label>
                    <input type="date" id="date" value={form.date} date={form.date} onChange={handleChange("date")} />
                </div>
                <div className="center">
                    <button onClick={() => callBack()}>Voltar</button>
                    <button onClick={request} className="primary">{(id) ? 'Salvar' : 'Cadastrar'}</button>
                </div>
            </div>
        </div>
    )
}