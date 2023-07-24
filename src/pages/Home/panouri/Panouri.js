export default function Panouri({ panouri }) {
    return (
        <>
            <option value="none" disabled hidden />
            {
                panouri.map((panou, index) => (
                    <option key={index} value={panou.nume}>{panou.nume}</option>
                ))
            }
        </>
    )
}