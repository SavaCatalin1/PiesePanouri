import { useState } from "react"
import "./Sidebar.css"
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Sidebar() {
    const [toggled, setToggled] = useState(false);

    const handleToggle = () => {
        if (toggled === true) {
            setToggled(false)
        }
        else {
            setToggled(true)
        }
    }

    return (
        <>
            <div className="toggle-btn" onClick={handleToggle}>{toggled ? <CloseIcon /> : <MenuIcon />}</div>
            <div className={toggled ? "sidebar-off" : "sidebar"}>
                <ul>
                    <Link to="/" style={{ textDecoration: 'none' }} > <li>Home</li></Link>
                    <Link to="/panouri" style={{ textDecoration: 'none' }}><li>Panouri</li></Link>
                </ul>
            </div >
        </>
    )
}

export default Sidebar