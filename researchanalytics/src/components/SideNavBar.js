import { Link } from "react-router-dom";

export default function SideNavBar(){
    return(
        <>
        <div className="ui secondary vertical menu ms-1">
            <div>
                <a className="item" > 
                    <Link to="/dashboard" className="text-dark">
                        <i className="chart line icon"></i>
                        Dashboard
                    </Link> 
                </a>
            </div>
            <div>
                <a className="item">
                    <Link to="#" className="text-dark">
                        <i className="file alternate icon"></i>
                        Articles
                    </Link>
                </a>
            </div>
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
                        <Link to="#" className="text-dark dropdown-item">
                            <i className="upload icon"></i>
                            Upload Authors
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    );
}