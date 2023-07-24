export default function Detaliipanou({ panou }) {
    return (
        <>
            <div className='detaliu-panou'>Lungime: {panou[0]}</div>
            <div className='detaliu-panou'>Latime: {panou[1]}</div>
            <div className='detaliu-panou'>Grosime: {panou[2]}</div>
        </>

    )
}