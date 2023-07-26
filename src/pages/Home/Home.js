import React, { useEffect, useState } from 'react'
import "./Home.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import Panouri from './panouri/Panouri';
import Detaliipanou from './detaliipanou/Detaliipanou';
import Rezultate from './rezultate/Rezultate';

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
    const [details, setDetails] = useState([])


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
                setShowRez(false)
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

    const calcTipCleme = () => {
        let detailss = [];
        let clemanume = ""
        let clemanume2 = ""
        let sinanume = ""
        let suruburinume = ""
        let caramelenume = ""
        if (Number(panou[2]) === 35) {
            clemanume = "Clema 1"
            detailss.push(clemanume)

        }
        else if (Number(panou[2]) === 40) {
            let clemanume = "Clema 2"
            detailss.push(clemanume)
        }
        setDetails(detailss);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tipMontaj === 0) {
            //Plana
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
                let carameletemp = (Math.ceil(sinarandtemp / 1000 + 1)).toFixed();
                caramele.push(carameletemp)
                let suruburitemp = 2 * carameletemp;
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
            calcTipCleme();

        }
        else if (tipMontaj === 1) {
            //Acoperis
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
            calcTipCleme()
        }
        else if (tipMontaj === 2) {
            //Mini Rail
            let clemeinterioare = [];
            let nr_panouri = 0;
            let sinarandvect = [];
            let suruburi = [];
            let caramele = [];
            let carameletotal = 0;
            let suruburitotal = 0;
            for (let i = 0; i < fieldValues.length; i++) {
                //cleme interioare minirail
                let vari = 2 * fieldValues[i] - 2;
                clemeinterioare.push(vari);
                //nr minirails
                let sinarandtemp = 2 * (Number(fieldValues[i]) + 1)
                sinarandvect.push(sinarandtemp)
                //nr panouri total
                nr_panouri = nr_panouri + Number(fieldValues[i]);
                //nr caramele (?)
                let carameletemp = (sinarandtemp / 1000 + 1).toFixed();
                caramele.push(carameletemp)
                //nr suruburi
                let suruburitemp = 4 * sinarandtemp;
                suruburi.push(suruburitemp)
            }
            setClemeInterioare(clemeinterioare)
            setSinaRand(sinarandvect);
            setCaramele(caramele);
            setSuruburi(suruburi);
            let clemeexterioare = 4 * nrRanduri;
            let clemeintnrtotal = 0;
            let sina = 0;
            for (let i = 0; i < clemeinterioare.length; i++) {
                clemeintnrtotal += clemeinterioare[i];
            }

            for (let y = 0; y < caramele.length; y++) {
                carameletotal += Number(caramele[y]);
                suruburitotal += Number(suruburi[y]);
            }

            for (let y = 0; y < sinarandvect.length; y++) {
                sina += Number(sinarandvect[y]);
            }


            let calcule = [clemeintnrtotal, clemeexterioare, sina, carameletotal, suruburitotal];
            setRezultat(calcule);
            setShowRez(true);
            calcTipCleme()
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
        console.log(panouri)
    }, [])


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
                        <Panouri panouri={panouri} />
                    </select>

                    <Detaliipanou panou={panou} />
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
                                    <div className='rez-rand'>{tipMontaj === 2 ? `Sina: ` + sinaRand[index] + " buc" : "Sina: " + sinaRand[index] / 1000 + " m"}</div>
                                    <div className='rez-rand'>{tipMontaj === 1 ? "Cleme mici: " + clemeInterioare[index] : "Cleme interioare: " + clemeInterioare[index]}</div>
                                    <div className='rez-rand'>{tipMontaj === 1 ? "Cleme mari: " + clemeInterioare[index] : "Cleme exterioare: 4"}</div>
                                    <div className='rez-rand'>Suruburi: {suruburi[index]}</div>
                                    <div className={tipMontaj === 2 ? "" : 'rez-rand'} >{tipMontaj === 2 ? `` : "Prinderi: " + caramele[index]}</div>
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
                        <div className='rez-flex'>
                            <Rezultate tipMontaj={tipMontaj} rezultat={rezultat} details={details} />
                        </div> : ""}
                </form>
            </div >
        </div >
    )
}

export default Home