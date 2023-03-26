import "./uploadAuthor.css"
export default function UploadLog({responses}){
    console.log(responses)
    return (
        <table className="ui single selectable green line table attached small mt-3" id="upload">
            <thead>
                <tr>
                    <th>Success</th>
                    <th>Error</th>
                </tr>
            </thead>
            <tbody>
                {
                    responses.map((response)=>{
                        return (
                            <tr>
                                <td>{response.message}</td>
                                <td>{response.Error}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
            
            </table>
    );
}