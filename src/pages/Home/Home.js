import React, { useEffect, useState } from 'react'
import "./Home.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';

const tipmontaje = ["Plana", "Acoperis", "Mini Rail"]

function Home() {
    const [panouri, setPanouri] = useState([])
    const [tipMontaj, setTipMontaj] = useState(null);
    const [panou, setPanou] = useState([]);
    const [nrRanduri, setNrRanduri] = useState(0);
    const [randuri, setRanduri] = useState([]);
    const [rezultat, setRezultat] = useState([]);
    const [fieldValues, setFieldValues] = useState([]);
    const [filled, setFilled] = useState(false);
    const [enableField, setEnableField] = useState(false);
    const [showRez, setShowRez] = useState(false);
    const [sinaRand, setSinaRand] = useState([]);
    const [clemeInterioare, setClemeInterioare] = useState([]);
    const [caramele, setCaramele] = useState([]);
    const [suruburi, setSuruburi] = useState([]);
    const [error, setError] = useState("");


    const fetchPost = async () => {

        await getDocs(collection(db, "panouri"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setPanouri(newData);
            })
    }



    const onChangeRanduri = (e) => {
        const nrRanduri = parseInt(e.target.value, 10) || 0;
        setNrRanduri(nrRanduri);
        setFieldValues(Array(nrRanduri).fill(''));

        if (tipMontaj != null && panou.length > 0 && nrRanduri > 0) {
            if (nrRanduri > 0) {
                const generateArrays = Array.from(Array(Number(nrRanduri)).keys())
                setRanduri(generateArrays);
                setRezultat([])
                setFilled(true)
            } else {
                setRanduri([])
                setRezultat([])
            }
        }
        else {
            if (tipMontaj == null) {
                setError("Alege tip montaj")
            }
            if (panou.length <= 0) {
                setError("Alege panou")
            }
            if (nrRanduri <= 0) {
                setError("Nr invalid")
            }
            console.log(error)
        }

    };

    const onChangeValori = (index, e) => {
        e.preventDefault();
        const newFieldValues = [...fieldValues];
        newFieldValues[index] = e.target.value;
        setFieldValues(newFieldValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tipMontaj === 0) {
            let clemeinterioare = [];
            let nr_panouri = 0;
            let sinarandvect = [];
            let suruburi = [];
            let caramele = [];
            let carameletotal = 0;
            let suruburitotal = 0;
            for (let i = 0; i < fieldValues.length; i++) {
                let vari = 2 * fieldValues[i] - 2;
                clemeinterioare.push(vari);
                let sinarandtemp = 2 * Number(fieldValues[i]) * panou[1] + 250
                sinarandvect.push(sinarandtemp)
                nr_panouri = nr_panouri + Number(fieldValues[i]);
                let carameletemp = (sinarandtemp / 1000 + 2).toFixed();
                caramele.push(carameletemp)
                let suruburitemp = 2 * carameletemp + vari + 4;
                suruburi.push(suruburitemp)
            }
            setClemeInterioare(clemeinterioare)
            setSinaRand(sinarandvect);
            setCaramele(caramele);
            setSuruburi(suruburi);
            let clemeexterioare = 4 * nrRanduri;
            let clemeintnrtotal = 0;
            for (let i = 0; i < clemeinterioare.length; i++) {
                clemeintnrtotal += clemeinterioare[i];
            }

            let sina = 2 * nr_panouri * panou[1] + (250 * nrRanduri)
            for (let y = 0; y < caramele.length; y++) {
                carameletotal += Number(caramele[y]);
                suruburitotal += Number(suruburi[y]);
            }
            let calcule = [clemeintnrtotal, clemeexterioare, sina, carameletotal, suruburitotal];
            setRezultat(calcule);
            setShowRez(true);

        }
        else if (tipMontaj === 1) {
            let clememici = [];
            let nr_panouri = 0;
            let sinarandvect = [];
            let suruburi = [];
            let caramele = [];
            let carameletotal = 0;
            let suruburitotal = 0;
            for (let i = 0; i < fieldValues.length; i++) {
                let vari = 2 * fieldValues[i];
                clememici.push(vari);

                let sinarandtemp = 2 * Number(fieldValues[i]) * panou[1] + 250
                sinarandvect.push(sinarandtemp)
                nr_panouri = nr_panouri + Number(fieldValues[i]);
                let carameletemp = (sinarandtemp / 1000 + 1).toFixed();
                caramele.push(carameletemp)
                let suruburitemp = 2 * carameletemp + 2 * vari;
                suruburi.push(suruburitemp)
            }
            setClemeInterioare(clememici)
            setSinaRand(sinarandvect);
            setCaramele(caramele);
            setSuruburi(suruburi);
            let clememicinrtotal = 0;
            for (let i = 0; i < clememici.length; i++) {
                clememicinrtotal += clememici[i];
            }
            let clememari = clememicinrtotal;
            for (let y = 0; y < caramele.length; y++) {
                carameletotal += Number(caramele[y]);
                suruburitotal += Number(suruburi[y]);
            }
            let sina = 2 * nr_panouri * panou[1] + (250 * nrRanduri)
            let calcule = [clememicinrtotal, clememari, sina, carameletotal, suruburitotal];
            setRezultat(calcule);
            setShowRez(true);
        }
        else if (tipMontaj === 2) {
            let clemeinterioare = [];
            let nr_panouri = 0;
            let sinarandvect = [];
            let suruburi = [];
            let caramele = [];
            let carameletotal = 0;
            let suruburitotal = 0;
            for (let i = 0; i < fieldValues.length; i++) {
                let vari = 2 * fieldValues[i] - 2;
                clemeinterioare.push(vari);
                let sinarandtemp = 4 * Number(fieldValues[i])
                sinarandvect.push(sinarandtemp)
                nr_panouri = nr_panouri + Number(fieldValues[i]);
                let carameletemp = (sinarandtemp / 1000 + 1).toFixed();
                caramele.push(carameletemp)
                let suruburitemp = 2 * sinarandtemp;
                suruburi.push(suruburitemp)
            }
            setClemeInterioare(clemeinterioare)
            setSinaRand(sinarandvect);
            setCaramele(caramele);
            setSuruburi(suruburi);
            let clemeexterioare = 4 * nrRanduri;
            let clemeintnrtotal = 0;
            for (let i = 0; i < clemeinterioare.length; i++) {
                clemeintnrtotal += clemeinterioare[i];

            }

            for (let y = 0; y < caramele.length; y++) {
                carameletotal += Number(caramele[y]);
                suruburitotal += Number(suruburi[y]);
            }

            let sina = 2 * clemeintnrtotal + clemeexterioare
            let calcule = [clemeintnrtotal, clemeexterioare, sina, carameletotal, suruburitotal];
            setRezultat(calcule);
            setShowRez(true);
        }
    }

    const onChangePanou = (e) => {
        e.preventDefault();
        for (let i = 0; i < panouri.length; i++) {
            if (e.target.value === panouri[i].nume) {
                let dummy = [panouri[i].lungime, panouri[i].latime, panouri[i].grosime]
                setPanou(dummy)
            }
        }
    }

    useEffect(() => {
        if (tipMontaj != null && panou.length > 0) {
            setEnableField(true);
        }
        setShowRez(false);
    }, [tipMontaj, panou])

    useEffect(() => {
        fetchPost()
    }, [panouri])


    return (
        <div>
            <Sidebar />
            <div className='home'>
                <div className='tip-montaj'>
                    <div className='montaj-title'>Tip montaj:</div>
                    {tipmontaje.map((item, index) => (
                        <div className={tipMontaj === index ? "montaj-btn-active" : "montaj-btn"} key={index} onClick={e => setTipMontaj(index)}>{item}</div>
                    ))}
                </div>
                <div className='tip-montaj'>
                    <div className='montaj-title'>Panou:</div>
                    <select className='select-panou' onChange={e => onChangePanou(e)} defaultValue="none">
                        <option value="none" disabled hidden />
                        {panouri.map((panou, index) => (
                            <option key={index} value={panou.nume}>{panou.nume}</option>
                        ))}
                    </select>

                    <div className='detaliu-panou'>Lungime: {panou[0]}</div>
                    <div className='detaliu-panou'>Latime: {panou[1]}</div>
                    <div className='detaliu-panou'>Grosime: {panou[2]}</div>
                </div>
                <div className='nr-rand-cont'>
                    <div className='montaj-title'>Numar de randuri:</div>
                    <input className='select-randuri' onChange={onChangeRanduri} value={nrRanduri} disabled={enableField === true ? false : true}></input>
                </div>
                <form onSubmit={e => handleSubmit(e)}>
                    {randuri.map((index) => (
                        <div className='nr-randuri' key={index}>
                            <div className='randuri-title'>Numar de panouri pe randul {index + 1}:</div>
                            <input className='randuri-value' onChange={e => onChangeValori(index, e)} value={fieldValues[index]}></input>
                            {showRez &&
                                <div className='rez-flex'>
                                    <div className='rez-rand'>{tipMontaj === 2 ? "Sina: " + sinaRand[index] + " buc" : "Sina: " + sinaRand[index] / 1000 + " m"}</div>
                                    <div className='rez-rand'>{tipMontaj === 1 ? "Cleme mici: " + clemeInterioare[index] : "Cleme interioare: " + clemeInterioare[index]}</div>
                                    <div className='rez-rand'>{tipMontaj === 1 ? "Cleme mari: " + clemeInterioare[index] : "Cleme exterioare: 4"}</div>
                                    <div className='rez-rand'>Suruburi: {suruburi[index]}</div>
                                    <div className='rez-rand'>Caramele: {caramele[index]}</div>
                                </div>
                            }
                        </div>
                    ))}
                    {filled &&
                        <div className='btn-container'>
                            <div></div>
                            <button className='calc-btn' type='submit'>Calculeaza</button>
                        </div>}
                    {showRez ?
                        <div className='rezultate-body'>
                            <div className='rezultate-row'>{tipMontaj === 1 && <span><b>Cleme mici: </b> {rezultat[0]} buc</span>}{tipMontaj === 0 && <span><b>Cleme interioare:</b> {rezultat[0]} buc</span>}{tipMontaj === 2 && <span><b>Cleme interioare:</b> {rezultat[0]} buc</span>}</div>

                            <div className='rezultate-row'>{tipMontaj === 1 && <span><b>Cleme mari:</b> {rezultat[1]} buc</span>}{tipMontaj === 0 && <span><b>Cleme exterioare:</b> {rezultat[1]} buc</span>}{tipMontaj === 2 && <span><b>Cleme exterioare:</b> {rezultat[1]} buc</span>}</div>

                            <div className='rezultate-row'><b>Sina:</b> {tipMontaj === 2 && <span>{rezultat[2]} buc</span>}{tipMontaj === 1 && <span>{rezultat[2] / 1000} m</span>}{tipMontaj === 0 && <span>{rezultat[2] / 1000} m</span>}</div>

                            <div className='rezultate-row'><b>Caramele:</b> {tipMontaj === 2 && <span>{rezultat[3]} buc</span>}{tipMontaj === 1 && <span>{rezultat[3]} buc</span>}{tipMontaj === 0 && <span>{rezultat[3]} buc</span>}</div>

                            <div className='rezultate-row'><b>Suruburi:</b> {tipMontaj === 2 && <span>{rezultat[4]} buc</span>}{tipMontaj === 1 && <span>{rezultat[4]} buc</span>}{tipMontaj === 0 && <span>{rezultat[4]} buc</span>}</div>
                        </div>
                        : ""}
                </form>
            </div >
        </div >
    )
}

export default Home