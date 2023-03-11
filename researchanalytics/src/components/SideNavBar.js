import { Link } from "react-router-dom";

export default function SideNavBar(){
    return(
        <>
        <div className="ui secondary vertical menu ms-1">
            <a className="item" > 
                <Link to="/dashboard" className="text-dark">
                    <i class="chart line icon"></i>
                    Dashboard
                </Link> 
            </a>
            <a className="item">
                <Link to="/authors" className="text-dark">
                    <i class="user icon"></i>
                    Authors
                </Link>
            </a>
        </div>
        </>
    );
}