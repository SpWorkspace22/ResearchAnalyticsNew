import './articlePage.css'

export default function ArticlesPage(){
    return(
        <div className="mt-4 ms-3 me-3">
            <h4 className="ui dividing header text-primary">Search Criteria</h4>
            <div className="ui form mb-1">
                <div className="field">
                    <div className="four fields">
                        <div className="field">
                            <label>Article Name</label>
                            <input type="text" name="searchEmail" placeholder="a@gmail.com"/>
                        </div>
                        <div className="field">
                            <label>Platform Type</label>
                            <select className="ui fluid dropdown" name="depart">
                                <option value="-1"></option>
                                <option value="GS">Google Scholar</option>
                                <option value="SC">Scopus</option>
                            </select>
                        </div>                      
                    </div>
                    <button className="ui primary button">Search</button>
                </div>
            </div>
            <hr/>
            <div className="two fields">
                <div className="field">
                    <button type="button" className="ui green button">Scan</button>
                    <button type="button" className="ui olive right floated circular icon button">
                        <i className="sync alternate icon"></i>
                    </button>
                </div>
            </div>
            <table className="ui single selectable green line table attached small mt-3">
            <thead>
                <tr>
                    <th>Article Id</th>
                    <th>Article Name</th>
                    <th>Journal Name</th>
                    <th>Published Year</th>
                    <th>Citation</th>
                    <th>Platform</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            </table>
        </div>
        
    );
}