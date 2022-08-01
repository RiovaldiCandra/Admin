import React from "react";
import axios from "axios";
import CustomerList from "../component/customerList";
import {Modal, Button, Form} from 'react-bootstrap';

export default class Customer extends React.Component{
    constructor() {
        super()
        this.state = {
            customers: [],
            isModalOpen: false,
            name: "",
            phone: "",
            address: "",
            username: "",
            password: "",
            image: null,
            action: "insert"

        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = '/login'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleEdit = (selectedItem) =>{
        this.setState({
            isModalOpen: true,
            customer_id: selectedItem.customer_id,
            name: selectedItem.name,
            phone: selectedItem.phone,
            address: selectedItem.address,
            image: null,
            username: selectedItem.username,
            password: "",
            action: "update"
        })
    }

    handleDelete = (customer_id) => {
        let url = "http://localhost:8080/customer/" + customer_id

        if (window.confirm('Anda yakin ingin menggapus data ini?')){
            axios.delete(url)
            .then(res => {
                console.log(res.data.message)
                this.getCustomer()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleAdd = () => {
        this.setState({
            isModalOpen: true,
            name:"",
            phone: "",
            address: "",
            username: "",
            password: "",
            image: null,
            action: "insert"
        })
    }

    handleSave= (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name", this.state.name)
        form.append("phone", this.state.phone)
        form.append("address", this.state.address)
        form.append("image", this.state.image)
        form.append("username", this.state.username)
        form.append("password", this.state.password)

        let url = ""

        if (this.state.action === "insert") {
            url = "http://localhost:8080/customer/"

            axios.post(url, form)
            .then(res => {
                this.getCustomer()
               this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }
        else if (this.state.action === "update"){
            url = "http://localhost:8080/customer/" + this.state.customer_id

            axios.put(url, form)
            .then(res => {
                this.getCustomer()
               this.handleClose()
            })
            .catch(err => {
               console.log(err.message)
            })
        }

    }


    getCustomer = () => {
        let url = "http://localhost:8080/customer"

        axios.get(url)
        .then(res => {
            this.setState({
                customers: res.data.customer
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }

    componentDidMount = () => {
        this.getCustomer()
    }

    render() {
        return(
            <div className='container'>
                <div className='row mt-5'>
                    <h2 className="text-center">Data customer</h2>
                </div>
                <div>
                    <div className="row">
                    <button className='btn btn-success' onClick={() => this.handleAdd()}>
                        Tambah Customer
                    </button>   
                        {this.state.customers.map((item, index) => {
                            return(
                            <CustomerList key={index}
                                nameImage={item.image}
                                image={"http://localhost:8080/image/customer/" + item.image}
                                name={item.name}
                                phone={item.phone}
                                address={item.address}
                                onEdit={() => {this.handleEdit(item)}}
                                onDrop={() => {this.handleDelete(item.customer_id)}}
                                />
                            )
                        })}
                    </div>
                </div>

                  {/* ini Modal */}
                  <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header>
                    <Modal.Title>Form Customer</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={e => this.handleSave(e)}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>NAME :</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Masukkan Name Customer" 
                            value={this.state.name} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>PHONE :</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="Masukkan Number Phone Customer" 
                            value={this.state.phone} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>ADDRESS :</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Masukkan Address Customer" 
                            value={this.state.address} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>IMAGE :</Form.Label>
                            <Form.Control type="file" name="image" placeholder="Masukkan Image Customer" 
                            value={this.state.Image} onChange={this.handleFile} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>USERNAME :</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Masukkan Username Customer" 
                            value={this.state.username} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>PASSWORD :</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Masukkan Password Customer" 
                            value={this.state.password} onChange={this.handleChange} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <button variant="secondary" onClick={this.handleClose}>
                        Close
                    </button>
                    <button variant="primary" type="submit">
                        Save
                    </button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        )
    }
}