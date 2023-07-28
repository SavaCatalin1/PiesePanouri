export default function Detaliipanou({ panou }) {
    console.log(panou)
    return (
        <>
            <div className='detaliu-panou'><b>Lungime:</b> {panou[0]}</div>
            <div className='detaliu-panou'><b>Latime:</b> {panou[1]}</div>
            <div className='detaliu-panou'><b>Grosime:</b> {panou[2]}</div>
        </>

    )
}