export default function Author({author,onEditClick,onDeleteClick}){
    return (
        <>
        <tr>
            <td>{author.author_id}</td>
            <td>{author.first_name+" "+author.last_name}</td>
            <td>{author.email}</td>
            <td>{author.phone}</td>
            <td>{author.depart_name}</td>
            <td>
                  <i className="edit icon text-primary" onClick={()=>onEditClick(author)}> </i> Edit
                | <i className="trash alternate icon text-danger" onClick={()=>{onDeleteClick(author.author_id)}}></i> Delete
            </td>
        </tr>
    </>
    );
}