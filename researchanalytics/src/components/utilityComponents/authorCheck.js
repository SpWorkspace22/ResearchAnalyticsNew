import "./uploadAuthor.css"
export default function AuthorCheck({authors}){
    return (
        <table className="ui single selectable green line table attached small mt-3">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>GS</th>
                    <th>SC</th>
                </tr>
            </thead>
            <tbody>
                {
                    authors.map((author)=>{
                        return (
                            <tr>
                                <td>{author.first_name}</td>
                                <td>{author.last_name}</td>
                                <td>{author.email}</td>
                                <td>{author.phone}</td>
                                <td>{author.depart_name}</td>
                                <td>{author.platform_data.GS}</td>
                                <td>{author.platform_data.SC}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
            
            </table>
    );
}