import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";


const Register = () => {

    const[id,idchange] = useState("");
    const[pwd,pwdchange] = useState("");

    const history = useNavigate();
    const handlesubmit = (e) =>{
        e.preventDefault();
        const newacc = {id,pwd};
        
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newacc)
        }).then((res)=>{
            alert('Registered');
            history('/login');
        }).catch((err) =>{
            console.log(err.message);   
        })
    }

    return(
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Register</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input value={id} required onChange={e=> idchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input value={pwd} type="password" required onChange={e=> pwdchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                    
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <Link to={'/login'} className="btn btn-danger">Close</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;