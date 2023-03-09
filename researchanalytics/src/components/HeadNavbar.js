import {Link} from 'react-router-dom';

export default function Navbar(){
    return (
        <div className="ui inverted attached small menu">
            <a className="item">
                <span className='text-primary fs-2'>R</span>A  
            </a>
            <a className="item">
               <Link to="/dashboard">Dashboard</Link> 
            </a>
            <a className="item">
                <Link to="/authors">Authors</Link>
            </a>
        </div>
    );
}