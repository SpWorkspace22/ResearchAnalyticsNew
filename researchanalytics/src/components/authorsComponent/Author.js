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
                  <button className="ui black basic small button" onClick={()=>onEditClick(author)}><i className="edit icon text-primary" > </i> Edit</button>
                | <button className="ui black basic small button" onClick={()=>{onDeleteClick(author.author_id)}}><i className="trash alternate icon text-danger" > </i> Delete</button>
            </td>
        </tr>
    </>
    );
}