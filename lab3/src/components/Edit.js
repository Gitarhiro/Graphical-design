import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Button, Form, FormControl, Table, FormSelect} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
function Edit()
{
    const { prodid } = useParams();

    const [info, datachange] = useState(null);
    
    const[id,idchange]=useState("");
    const [code,codechange]=useState("");
    const [name,namechange]=useState("");
    const [description,descriptionchange]=useState("");
    const [category,categorychange]=useState("");
    const [quantity,quantitychange]=useState("");
    const [measure,measurechange]=useState("");
    const [price,pricechange]=useState("");
    const[validation,valchange]=useState(false);

    const history = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:5000/categories").then((res) => {
            return res.json();
        }).then((resp) => {
            datachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })

        fetch("http://localhost:5000/products/" + prodid).then((res)=>
        {
            return res.json();
        }).then((resp)=> {
            idchange(resp.id)
            codechange(resp.code);
            namechange(resp.name);
            descriptionchange(resp.description);
            categorychange(resp.category);
            quantitychange(resp.quantity);
            measurechange(resp.measure);
            pricechange(resp.price);
        }).catch((err)=>{
            console.log(err.message);
        })
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
        const info={id,code,name,description,category,quantity,measure,price}

        fetch("http://localhost:5000/products/"+prodid,{ 
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(info)
        }).then((res)=>{
            alert('SAVED!');
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
                                <h2>Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>id</label>
                                            <input value={id} disabled className="form-control"></input>
                                        </div>
                                    </div> */}

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>code</label>
                                            <input value={code} disabled className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} maxlength="16" onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>description</label>
                                            <input value={description} onChange={e=>descriptionchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>category</label>
                                            <select className="form-select" required  aria-label="Default select example" selected={category} onChange={e=>categorychange(e.target.value)} >
                                            {
                                            info && 
                                            info.map(item=>(
                                                    <option key={item.id} value={item.name}>{item.name}</option>
                                            ))
                                            }
                                            </select>
                                        </div>
                                    </div> 

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>quantity</label>
                                            <input value={quantity} required type="number" step="0.01" onChange={e=>quantitychange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <label>measure</label>
                                        <select className="form-select" required  aria-label="Default select example" selected={measure} onChange={e=>measurechange(e.target.value)}>
                                            <option value="kg">kg</option>
                                            <option value="pcs">pcs</option>
                                            <option value="litre" >litre</option>
                                        </select>
                                    </div>
                                    <br></br>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>price</label>
                                            <input value={price} type="number" required step="0.01" onChange={e=>pricechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>



                                    <br></br>
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

export default Edit;