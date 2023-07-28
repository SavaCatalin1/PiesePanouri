import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Panouri.css"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { db } from '../../firebase';

function Panouri() {
    const [categorii, setCategorii] = useState([])
    const [categorieSelected, setCategorieSelected] = useState({ nume: "asd" })
    const [items, setItems] = useState([])
    const [isAdding, setIsAdding] = useState(false)
    const [nrPanouri, setNrPanouri] = useState()
    const [post, setPost] = useState()


    Object.defineProperty(categorieSelected, 'nume', {
        enumerable: false,
    });
    Object.defineProperty(categorieSelected, 'id', {
        enumerable: false,
    });
    Object.defineProperty(categorieSelected, 'display', {
        enumerable: false,
    });




    const fetchPost = async () => {
        console.log(categorieSelected.nume)
        await getDocs(query(collection(db, categorieSelected.nume), orderBy("Nume", "asc")))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setItems(newData);
                setNrPanouri(newData.length)
            })

    }

    const fetchCategorii = async () => {
        await getDocs(query(collection(db, "categorii"), orderBy('nume')))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCategorii(newData);
            })
    }



    const addTodo = async (e) => {
        e.preventDefault();
        setPost((v) => ({ ...v, numetabel: "Nume" }))
        try {
            const docRef = await addDoc(collection(db, categorieSelected.nume), post);
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
            await deleteDoc(doc(db, categorieSelected.nume, val))
            setNrPanouri(prev => prev - 1)
        } catch (e) {
            console.error("Error: ", e);
        }
    }

    useEffect(() => {
        fetchCategorii()
        console.log(categorii)

    }, [])


    useEffect(() => {
        console.log(categorieSelected)
        if (Object.keys(categorieSelected).length > 0) {
            fetchPost()
            console.log(categorii)
            console.log(categorieSelected)
            console.log(items)
        }
        setPost()
    }, [nrPanouri, categorieSelected])



    return (
        <div>
            <Sidebar />
            <div className='home'>
                {isAdding === false &&
                    <>
                        <div className='tabs-bar'>
                            {categorii.map((tab, index) => (
                                <div key={index} className={categorieSelected.nume === tab.nume ? 'tab-item-active' : 'tab-item'} onClick={() => setCategorieSelected(tab)}>{tab.display}</div>
                            ))}
                        </div>

                        <div className="table_body">
                            {items.length > 0 &&
                                <table>

                                    <thead>
                                        <tr>
                                            {Object.keys(items[0]).filter(row => row !== "id").filter(row => row !== 'numetabel').map((row, index) => (
                                                <th className='th-dimensiuni' key={index} style={{ borderRadius: index === row.length - 1 ? '0 10px 0 0' : '0', }}>{row}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                {console.log(item)}
                                                {Object.entries(item).filter(row => row.indexOf("id")).map(([val, key]) => (
                                                    (key === "Nume" ? "" : <td className='td-dimensiuni'>{key}</td>)
                                                ))}
                                                <td className='td-remove' onClick={() => handleDel(item.id)}>X</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>}
                            <button className='add-btn' onClick={handleAdd}>Adauga</button>
                        </div>
                    </>
                }
                {isAdding === true &&
                    <div className='adding-container'>

                        <div className='inputs-body'>
                            <div className='addedCategoryItem'>{categorieSelected.display}</div>

                            {Object.values(categorieSelected).filter(([_, value]) => value !== "nume").map((input, index) => (
                                <div className='input-flex' key={index}>
                                    <div className='input-name'>{input}</div>
                                    <input className='input-value' id={input} onChange={(e) => { setPost((v) => ({ ...v, [e.target.id]: e.target.value })); console.log(post) }}></input>
                                </div>
                            ))}

                            <div className='butoane'>
                                <button className='add-btn2' onClick={addTodo}>Adauga</button>
                                <div className='x-btn' onClick={handleAdd}>X</div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </div >
    )
}

export default Panouri