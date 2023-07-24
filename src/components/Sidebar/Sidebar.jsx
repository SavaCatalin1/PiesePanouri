import "./Sidebar.css"
import { Link } from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <Link to="/" style={{ textDecoration: 'none' }}><li>Home</li></Link>
                <Link to="/panouri" style={{ textDecoration: 'none' }}><li>Panouri</li></Link>
            </ul>
        </div >
    )
}

export default Sidebar