export default function Rezultate({ tipMontaj, rezultat }) {

    return (
        <div className='rezultate-body'>
            <div className='rezultate-row'>{tipMontaj === 1 && <span><b>Cleme mici: </b> {rezultat[0]} buc</span>}{tipMontaj === 0 && <span><b>Cleme interioare:</b> {rezultat[0]} buc</span>}{tipMontaj === 2 && <span><b>Cleme interioare:</b> {rezultat[0]} buc</span>}</div>

            <div className='rezultate-row'>{tipMontaj === 1 && <span><b>Cleme mari:</b> {rezultat[1]} buc</span>}{tipMontaj === 0 && <span><b>Cleme exterioare:</b> {rezultat[1]} buc</span>}{tipMontaj === 2 && <span><b>Cleme exterioare:</b> {rezultat[1]} buc</span>}</div>

            <div className='rezultate-row'><b>Sina:</b> {tipMontaj === 2 && <span>{rezultat[2]} buc</span>}{tipMontaj === 1 && <span>{rezultat[2] / 1000} m</span>}{tipMontaj === 0 && <span>{rezultat[2] / 1000} m</span>}</div>

            <div className='rezultate-row'><b>Caramele:</b> {tipMontaj === 2 && <span>{rezultat[3]} buc</span>}{tipMontaj === 1 && <span>{rezultat[3]} buc</span>}{tipMontaj === 0 && <span>{rezultat[3]} buc</span>}</div>

            <div className='rezultate-row'><b>Suruburi:</b> {tipMontaj === 2 && <span>{rezultat[4]} buc</span>}{tipMontaj === 1 && <span>{rezultat[4]} buc</span>}{tipMontaj === 0 && <span>{rezultat[4]} buc</span>}</div>
        </div>
    )
}