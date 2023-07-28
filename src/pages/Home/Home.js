import React, { useEffect, useState } from 'react'
import "./Home.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import Panouri from './panouri/Panouri';
import Detaliipanou from './detaliipanou/Detaliipanou';
import Rezultate from './rezultate/Rezultate';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const tipmontaje = ["Standard", "Est-Vest", "Mini Rail"]
const naturaacoperis = ["Tigla", "Tabla", "Faltuita"]

function Home() {
    const [panouri, setPanouri] = useState([{}])
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
    const [acoperis, setAcoperis] = useState();
    const [montajDropdown, setMontajDropdown] = useState(true)
    const [montajDropdown2, setMontajDropdown2] = useState(true)

    const fetchPost = async () => {
        await getDocs(collection(db, "panouri"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setPanouri(newData);
                console.log(newData)
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
        let clemanumeint = ""
        let sinanume = ""
        let suruburinume = ""
        let caramelenume = ""
        //Clema interioara details
        clemanumeint = " - Clema intermediara"
        detailss.push(clemanumeint)
        //Clema exterioara details
        if (Number(panou[2]) === 35) {
            clemanume = " - Clema capat 35mm"
            detailss.push(clemanume)
        }
        else if (Number(panou[2]) === 40) {
            let clemanume = " - Clema capat 40mm"
            detailss.push(clemanume)
        }
        else if (Number(panou[2]) === 30) {
            let clemanume = " - Clema capat 30mm"
            detailss.push(clemanume)
        }
        else {
            let clemanume = "-"
            detailss.push(clemanume)
        }
        //Sina details
        if (tipMontaj === 2) {
            sinanume = " - Mini Rail"
            detailss.push(sinanume)
        }
        else if (tipMontaj === 1) {
            sinanume = " - R60"
            detailss.push(sinanume)
        }
        else if (tipMontaj === 0) {
            sinanume = " - R52"
            detailss.push(sinanume)
        }
        //Prinderi details
        if (tipMontaj === 1) {
            caramelenume = " - Tavita aluminiu"
            detailss.push(caramelenume)
        }
        if (tipMontaj === 0 && acoperis === 0) {
            caramelenume = " - Carlig montaj tigla (hook)"
            detailss.push(caramelenume)
        }
        else if (tipMontaj === 0 && acoperis === 1) {
            caramelenume = " - Clema rapida prindere sina (caramele)"
            detailss.push(caramelenume)
        }
        else if (tipMontaj === 0 && acoperis === 2) {
            caramelenume = " - Suport fixare tabla faltuita + coltar 60x30 + surub 10mm cu piulita"
            detailss.push(caramelenume)
        }

        //Suruburi details

        if (tipMontaj === 0) {
            if (acoperis === 0) {
                suruburinume = " - Surub autoforant 6,3x80 cu saiba"
            }
            else if (acoperis === 1) {
                suruburinume = " - Surub 60x40"
            }
            else if (acoperis === 2) {
                suruburinume = " - Surub 10mm cu piulita"
            }
        }
        else if (tipMontaj === 2) {
            suruburinume = " - Surub 60x30"
        }
        detailss.push(suruburinume)
        setDetails(detailss);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tipMontaj === 0) {
            //Standard
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
            //Est-Vest
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
                let carameletemp = (Math.ceil(sinarandtemp / 5000) * 4).toFixed()
                //let carameletemp = (Math.ceil(sinarandtemp / 800 + 1)).toFixed();
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
        console.log(e.target.value)
        for (const obj of panouri) {
            if (obj.Nume === e.target.value) {
                let dummy = [obj.Lungime, obj.Latime, obj.Grosime]
                setPanou(dummy)
            }
        }

        // for (let i = 0; i < panouri.length; i++) {
        //     if (e.target.value === panouri[i].nume) {
        //         let dummy = [panouri[i].lungime, panouri[i].latime, panouri[i].grosime]
        //         setPanou(dummy)
        //     }
        // }
    }

    const toggle = () => {
        if (montajDropdown === true) {
            setMontajDropdown(false)
        }
        else {
            setMontajDropdown(true)
        }
    }

    const toggle2 = () => {
        if (montajDropdown2 === true) {
            setMontajDropdown2(false)
            setMontajDropdown(false)
            setShowRez(false)
        }
        else {
            setMontajDropdown2(true)
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
                <div className='tip-montaj2'>
                    <div className='montaj-title'>Tip montaj:<span onClick={toggle} className='drop-btn'>{montajDropdown ? <ArrowLeftIcon /> : <ArrowRightIcon />}</span></div>
                    {montajDropdown && tipmontaje.map((item, index) => (
                        <div className={tipMontaj === index ? "montaj-btn-active" : "montaj-btn"} key={index} onClick={e => { setTipMontaj(index); toggle() }}>{item}</div>
                    ))}
                </div>
                {tipMontaj === 0 &&
                    <div className='tip-montaj2'>
                        <div className='montaj-title'>Natura acoperis:<span onClick={toggle2} className='drop-btn'>{montajDropdown2 ? <ArrowLeftIcon /> : <ArrowRightIcon />}</span></div>
                        {montajDropdown2 && naturaacoperis.map((item, index) => (
                            <div className={acoperis === index ? "montaj-btn-active" : "montaj-btn"} key={index} onClick={e => { setAcoperis(index); toggle2() }}>{item}</div>
                        ))}
                    </div>}
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
                                    <div className={tipMontaj === 1 ? "" : 'rez-rand'}>{tipMontaj === 1 ? "" : "Suruburi: " + suruburi[index]}</div>
                                    <div className={tipMontaj === 2 ? "" : 'rez-rand'} >{tipMontaj === 2 ? "" : "Prinderi: " + caramele[index]}</div>
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