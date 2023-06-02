import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const Login = () =>
{
    const [id,idchange] = useState("");
    const [pwd,pwdchange] = useState("");

    useEffect(()=>{
        sessionStorage.clear();
    })

    const history = useNavigate();

    const ProceedLogin = (e) =>{
        e.preventDefault();
        fetch("http://localhost:5000/users/"+id).then((res)=>{
            return res.json();
        }).then((resp)=>{
            if(Object.keys(resp.id).length===0){
                alert('User not found');
            } else{
                if(resp.pwd===pwd){
                    sessionStorage.setItem('id',id);
                    history('/');
                }else{
                    alert('Incorrect password');
                }
            }
        })
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Username</label>
                                <input value={id} required onChange={e=>idchange(e.target.value)} className="form-control" ></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" required value={pwd} onChange={e=>pwdchange(e.target.value)} className="form-control" ></input>
                            </div>
                        </div>
                        <div className="card-ffoter">
                            <button type="submit" className="btn btn-primary">Log in</button>
                            <Link className="btn btn-success" to={'/register'}>Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )


}

export default Login;