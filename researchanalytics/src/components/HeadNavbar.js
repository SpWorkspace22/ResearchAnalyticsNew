import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

export default function Navbar(){
    const navigate = useNavigate()

    const [state,setState] = useState()

    useEffect(()=>{
        setState(localStorage.getItem("status")==='true')
    },[])


    function handleLogout(){
        localStorage.setItem("status",false)
        localStorage.setItem("user","")
        setState(false)
        navigate("/")
    }


    return (
        <div className="ui inverted teal attached  small menu shadow">
            <a className="item">
                <span className='fs-2'><i className="chart bar outline icon"></i>R</span>A  
            </a>
            <a className="item" > 
                <Link to="/dashboard">
                    <i className="chart line icon"></i>
                    Dashboard
                </Link> 
            </a>
            <div className="ui dropdown item">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="user icon"></i> Authors
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <Link to="/authors" className="text-dark dropdown-item">
                            <i className="user icon"></i>
                                Manage Authors
                        </Link></li>
                    <li>
                        <Link to="/uploadAuth" className="text-dark dropdown-item">
                            <i className="upload icon"></i>
                            Upload Authors
                        </Link>
                    </li>
                </ul>
            </div>
            <a className="item">
                <Link to="/article" >
                    <i className="file alternate icon"></i>
                    Articles
                </Link>
            </a>
            {state ?
                <div class="right menu">
                    <a className="item">
                        <Link to="/login" >
                            <i className="file alternate icon"></i>
                            Login
                        </Link>
                    </a> 
                </div>
                :
                <div class="right menu">
                    <div class="ui dropdown item">
                        <a className="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="user icon"></i> {localStorage.getItem("user")}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <Link to="/setup" className="text-dark dropdown-item">
                                    <i class="cogs icon"></i> Settings
                                </Link> 
                            </li>
                            <li className="text-dark dropdown-item" onClick={handleLogout}>
                                <i class="sign-out icon"></i> Log Out
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
}