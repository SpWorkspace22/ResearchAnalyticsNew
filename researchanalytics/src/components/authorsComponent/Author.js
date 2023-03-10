export default function Author({author,onEditClick,onDeleteClick}){
    return (
        <>
        <tr>
            <td>{author.author_id}</td>
            <td>{author.first_name+" "+author.last_name}</td>
            <td>{author.email}</td>
            <td>{author.phone}</td>
            <td>{author.department_id}</td>
            <td>
                  <i className="edit icon text-primary" onClick={()=>onEditClick(author)}></i> 
                | <i className="trash alternate icon text-danger" onClick={()=>{onDeleteClick(author.author_id)}}></i>
                | <i class="info circle icon"></i>View More
            </td>
        </tr>
    </>
    );
}