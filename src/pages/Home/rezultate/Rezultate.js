import { useState } from "react"

export default function Rezultate({ tipMontaj, rezultat, details }) {
    const [detailsToggle, setDetailsToggle] = useState(false)

    const handleDetails = () => {
        if (detailsToggle === true) {
            setDetailsToggle(false)
        }
        else {
            setDetailsToggle(true)
            console.log(details)
        }
    }

    return (
        <div className='rezultate-body'>
            <div className='rezultate-row'>{tipMontaj === 1 && <span><b>Cleme mici: </b> {rezultat[0]} buc {detailsToggle ? details[0] : ""}</span>}{tipMontaj === 0 && <span><b>Cleme interioare:</b> {rezultat[0]} buc {detailsToggle ? details[0] : ""}</span>}{tipMontaj === 2 && <span><b>Cleme interioare:</b> {rezultat[0]} buc {detailsToggle ? details[0] : ""}</span>}</div>

            <div className='rezultate-row'>{tipMontaj === 1 && <span><b>Cleme mari:</b> {rezultat[1]} buc {detailsToggle ? details[1] : ""}</span>}{tipMontaj === 0 && <span><b>Cleme exterioare:</b> {rezultat[1]} buc {detailsToggle ? details[1] : ""}</span>}{tipMontaj === 2 && <span><b>Cleme exterioare:</b> {rezultat[1]} buc {detailsToggle ? details[1] : ""}</span>}</div>

            <div className='rezultate-row'><b>Sina:</b> {tipMontaj === 2 && <span>{rezultat[2]} buc {detailsToggle ? details[2] : ""}</span>}{tipMontaj === 1 && <span>{rezultat[2] / 1000} m {detailsToggle ? details[2] : ""}</span>}{tipMontaj === 0 && <span>{rezultat[2] / 1000} m {detailsToggle ? details[2] : ""}</span>}</div>

            <div className={tipMontaj === 2 ? "" : 'rezultate-row'}> {tipMontaj === 2 && ""}{tipMontaj === 1 && <span><b>Prinderi:</b> {rezultat[3]} buc {detailsToggle ? details[3] : ""}</span>}{tipMontaj === 0 && <span><b>Prinderi:</b> {rezultat[3]} buc {detailsToggle ? details[3] : ""}</span>}</div>

            <div className='rezultate-row'> {tipMontaj === 2 && <span><b>Suruburi: </b>{rezultat[4]} buc {detailsToggle ? details[4] : ""}</span>}{tipMontaj === 0 && <span><b>Suruburi: </b>{rezultat[4]} buc {detailsToggle ? details[4] : ""}</span>}</div>

            <button className="details-btn" onClick={handleDetails}>{detailsToggle ? "Ascunde detalii" : "Vezi detalii"}</button>

        </div>
    )
}