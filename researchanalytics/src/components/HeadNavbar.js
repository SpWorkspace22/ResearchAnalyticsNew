import {Link} from 'react-router-dom';

export default function Navbar(){
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
            <div class="right menu">
                <a class="ui item pe-5">
                    <Link to="/setup" >
                        <i class="cogs icon"></i> Settings
                    </Link>
                </a>
            </div>
        </div>
    );
}