import React, { useEffect, useState,Fragment} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


function List() {
  const [info, datachange] = useState(null);
  let history = useNavigate();
  let id = sessionStorage.getItem('id');
  

  const LoadEdit = (id) =>
  {
    history("Edit/"+ id);
  }

  const AccountDelete = (id) =>{
    if (window.confirm('Do you want to remove your account?')) {
      fetch("http://localhost:5000/users/" + id, {
          method: "DELETE"
      }).then((res) => {
          alert('Removed successfully.')
          history('/login');
      }).catch((err) => {
          console.log(err.message)
      })
  }
  }

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
        fetch("http://localhost:5000/products/" + id, {
            method: "DELETE"
        }).then((res) => {
            alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

  useEffect(() => {

    if( id ===''||id===null){
      history('/login');
    }
    fetch("http://localhost:5000/products").then((res) => {
        return res.json();
    }).then((resp) => {
        datachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
    }, [])

    return (
      <Fragment>
        <div classNamee = "container">
        <div className = "card">
            <div className = "card-title">
              <h2>List</h2>
            </div>
            <div className = "card-body">
              <div className = "divbtn">
                <Button onClick={() => {AccountDelete(id) }} className="btn btn-danger">Delete Account</Button>
              </div>
              <br></br>
              <div className = "divbtn">
                <Link to="/Login">
                  <Button size ="lg" className="btn-danger">Logout</Button>
                </Link>
                
              </div>
              <br></br>
              <div className = "divbtn">
                  <Link to="/Create" className = "btw btwn-success">
                    <Button size ="lg">Create Entry</Button>
                  </Link>
              </div>
              <br></br>
              <table className="table table-bordered">
              <thead className = "bg-dark text-white">
              <tr>
                {/* <th>Id</th> */}
                <th>Code</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Measure</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {info &&
                    info.map(item=>(
                      <tr key={item.id}>
                        {/* <td>{item.id}</td> */}
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity}</td>
                        <td>{item.measure}</td>
                        <td>{item.price}</td>
                        <td>
                        <Button onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</Button>
                        &nbsp;
                        <Button onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</Button>
                        </td>
                      </tr>
                    ))
              }
            </tbody>
              </table>
            </div>
        </div>
      </div>
      </Fragment>
      
    )
}

export default List;