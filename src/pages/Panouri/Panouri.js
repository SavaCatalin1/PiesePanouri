import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Panouri.css"
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';

function Panouri() {

    const [panouri, setPanouri] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const [nume, setNume] = useState("")
    const [lungimePanou, setLungimePanou] = useState()
    const [latimePanou, setLatimePanou] = useState()
    const [grosimePanou, setGrosimePanou] = useState()
    const [nrPanouri, setNrPanouri] = useState()

    const fetchPost = async () => {

        await getDocs(collection(db, "panouri"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setPanouri(newData);
                setNrPanouri(newData.length)
                console.log(nrPanouri)
            })
    }



    const addTodo = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "panouri"), {
                nume: nume,
                lungime: lungimePanou,
                latime: latimePanou,
                grosime: grosimePanou
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setNrPanouri(prev => prev + 1)
        setIsAdding(false);
    }

    const handleAdd = () => {
        if (isAdding === true) {
            setIsAdding(false)
        }
        else {
            setIsAdding(true)
        }
    }

    const handleDel = async (val) => {
        try {
            console.log(val)
            await deleteDoc(doc(db, "panouri", val))
            setNrPanouri(prev => prev - 1)
        } catch (e) {
            console.error("Error: ", e);
        }
    }

    useEffect(() => {
        fetchPost()
        console.log(panouri)
    }, [nrPanouri])



    return (
        <div>
            <Sidebar />
            <div className='home'>
                {isAdding === false &&
                    <button className='add-btn' onClick={handleAdd}>Adauga</button>}
                {isAdding === false &&
                    <div className="table_body">

                        <table>
                            <thead>
                                <tr>
                                    <th className='th-nume'>Denumire panou</th>
                                    <th className='th-dimensiuni'>Lungime</th>
                                    <th className='th-dimensiuni'>Latime</th>
                                    <th className='th-dimensiuni'>Grosime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {panouri.map((panou, index) => (
                                    <tr className="table_row" key={index}>
                                        <td className='td-nume'>{panou.nume}</td>
                                        <td className='td-dimensiuni'>{panou.lungime}</td>
                                        <td className='td-dimensiuni'>{panou.latime}</td>
                                        <td className='td-dimensiuni'>{panou.grosime}</td>
                                        <td className='td-remove' onClick={() => handleDel(panouri[index].id)}>X</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                }
                {isAdding === true &&
                    <div className='adding-container'>

                        <div className='inputs-body'>
                            <div className='input-flex'>
                                <div className='input-name'>Denumire panou: </div>
                                <input className='input-value' onChange={(e) => setNume(e.target.value)}></input>
                            </div>
                            <div className='input-flex'>
                                <div className='input-name'>Lungime panou: </div>
                                <input className='input-value2' onChange={(e) => setLungimePanou(e.target.value)}></input>
                            </div>
                            <div className='input-flex'>
                                <div className='input-name'>Latime panou: </div>
                                <input className='input-value2' onChange={(e) => setLatimePanou(e.target.value)}></input>
                            </div>
                            <div className='input-flex'>
                                <div className='input-name'>Grosime panou: </div>
                                <input className='input-value2' onChange={(e) => setGrosimePanou(e.target.value)}></input>
                            </div>
                            <div className='butoane'>
                                <button className='add-btn2' onClick={addTodo}>Adauga</button>
                                <div className='x-btn' onClick={handleAdd}>X</div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default Panouri