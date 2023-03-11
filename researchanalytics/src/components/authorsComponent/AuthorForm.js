import axios
 from "axios";
export default function AuthorsForm(){

    function onFormSubmit(e){
        e.preventDefault();

        let userData = {
            author_id:"",
            first_name:e.target.first_name.value,
            last_name:e.target.last_name.value,
            email:e.target.email.value,
            phone:e.target.phone.value
        }
        axios.post('http://127.0.0.1:5000/authors', userData)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <form className="ui small form p-2" onSubmit={onFormSubmit} method="POST">
            <h4 className="ui dividing header text-primary">Personal Information</h4>
            <div className="field">
                <div className="five fields">
                    <div className="field">
                        <label >First Name</label>
                        <input type="text" name="first_name" placeholder="First Name" required/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="last_name" placeholder="Last Name" required/>
                    </div>
                    <div className="field">
                        <label>Department</label>
                        <select className="ui fluid dropdown" required>
                            <option value="MCA">MCA</option>
                            <option value="BTECH">BTECH</option>
                        </select>
                    </div>
                   <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="abc@gmail.com" required/>
                    </div>
                    <div className="field">
                        <label>Phone Number</label>
                        <input type="text" name="phone" placeholder="1234567890" />
                    </div>
                </div>
            </div>
            <h4 className="ui dividing header text-primary">Platform Details</h4>
            <div className="field">
                <div className="two fields">
                    <div className="field">
                        <label>Scopus Id</label>
                        <input type="text" name="scopusId" placeholder="1234"/>
                    </div>
                    <div className="field">
                        <label>Google Scholar Id</label>
                        <input type="text" name="scholarId" placeholder="1234"/>
                    </div> 
                </div>
            </div>
            <input type="submit" className="ui primary button large"  value="Save" />
        </form>
    );
}