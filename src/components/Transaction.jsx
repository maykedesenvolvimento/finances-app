import React, { useState } from "react"
import http from "../http-common"

export default function Transaction({ callBack }) {
    const [type, setType] = useState("+")
    const [form, setForm] = useState({
        description: "",
        category: "",
        value: 0,
        date: ""
    })

    const changeType = (event) => setType(event.target.value)
    const handleChange = (field) => (event) => setForm({ ...form, [field]: event.target.value })

    const create = () => {
        console.log({ ...form, type })
        //http.post("api/transaction", {...form, type})
    }

    return (
        <div className="center">
            <div className="form">
                <h4>Novo lançamento: </h4>

                <div className="center">
                    <input type="radio" id="typePlus" value="+" checked={type === "+"} onChange={changeType} /> <label htmlFor="typePlus">Receita</label>
                    <input type="radio" id="typeMinus" value="-" checked={type === "-"} onChange={changeType} style={{ marginLeft: "1rem" }} /> <label htmlFor="typeMinus">Despesa</label>
                </div>
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
                    <input type="date" id="date" date={form.date} onChange={handleChange("date")} />
                </div>
                <div className="center">
                    <button onClick={() => callBack()}>Voltar</button>
                    <button onClick={create} className="primary">Cadastrar</button>
                </div>
            </div>
        </div>
    )
}