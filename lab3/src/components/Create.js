import React, {useState,useEffect,Fragment} from "react";
import {Button, Form, FormControl, Table, FormSelect} from 'react-bootstrap';
import {Link, useNavigate, useParams} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function Create() {
    let history = useNavigate();
    const [info, datachange] = useState(null);

    const [id,idchange]=useState("");
    const [code,codechange]=useState("");
    const [name,namechange]=useState("");
    const [description,descriptionchange]=useState("");
    const [category,categorychange]=useState("");
    const [quantity,quantitychange]=useState("");
    const [measure,measurechange]=useState("");
    const [price,pricechange]=useState("");

    useEffect(() => {
        fetch("http://localhost:5000/categories").then((res) => {
            return res.json();
        }).then((resp) => {
            datachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
        }, [])


    const handleSubmit = (e) =>{
        e.preventDefault();
        const info ={id,code,name,description,category,quantity,measure,price}
        
        fetch("http://localhost:5000/products/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(info)
        }).then((res)=>{
            alert('ENTRY CREATED');
            history('/');
        }).catch((err)=>{
            console.log(err.message)
        })
    }

    return(
        <div>
            <div className="row">
            <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Create Entry</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {/* <div className="form-group">
                                    <label>id</label>
                                    <input value={id} onChange={e=>idchange(e.target.value)} className="form-control"></input>
                                </div> */}
                                <div className="form-group">
                                    <label>code</label>
                                    <input value={code} required maxlength="8" onChange={e=>codechange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>name</label>
                                    <input value={name} required maxlength="16" onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>description</label>
                                    <input value={description} onChange={e=>descriptionchange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>category</label>
                                    <select className="form-select" required  aria-label="Default select example"  onChange={e=>categorychange(e.target.value)}>
                                        <option value="" selected disabled hidden>Choose here</option>
                                        {
                                        info && 
                                        info.map(item=>(
                                                <option key={item.id} value={item.name}>{item.name}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>quantity</label>
                                    <input required type="number" step="0.01" value={quantity} onChange={e=>quantitychange(e.target.value)} className="form-control"></input>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label>measure</label>
                                    <select className="form-select" required  aria-label="Default select example" onChange={e=>measurechange(e.target.value)}>
                                        <option value="" selected disabled hidden>Choose here</option>
                                        <option value="kg">kg</option>
                                        <option value="pcs">pcs</option>
                                        <option value="litre" >litre</option>
                                    </select>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <label>price</label>
                                    <input type="number" required step="0.01" value={price} onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>

    )
}
export default Create;