export default function Author({author}){
    return (
        <>
        <tr>
            <td>{author.author_id}</td>
            <td>{author.first_name}</td>
            <td>{author.last_name}</td>
            <td>{author.email}</td>
            <td>{author.phone}</td>
            <td>
                <i className="edit icon text-primary"></i> | <i className="trash alternate icon text-danger"></i>
            </td>
            <td>
                <i class="info circle icon"></i>
            </td>
        </tr>
    </>
    );
}