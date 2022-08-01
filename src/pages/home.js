import React from 'react'
import axios from "axios";
import { AiFillAccountBook } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GoPackage } from "react-icons/go";

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token : "",
            adminName : "",
            adminCount: 0,
            customerCount: 0,
            productCount: 0,
            transaksiCount: 0,
            currentDateTime: Date().toLocaleString()
        }
        if(localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else{
            window.location = '/login'
        }
    }
    headerConfig = () => {
        let header = {
            headers : {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    getAdmin = () => {
        let admin = (localStorage.getItem('name'))
        let url = "http://localhost:8080/store/admin"

        axios.get(url)
        .then(res => {
            this.setState({
                adminCount: res.data.count
            })
        })
        .catch(err =>{
            console.log(err.message)
        })
    }

    getCustomer = () => {
        let url = "http://localhost:8080/customer"
        
        axios.get(url)
        .then(res => {
            this.setState({
                customerCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getProduct = () => {
        let url = "http://localhost:8080/product"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                productCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getTransaksi = () => {
        let url = "http://localhost:8080/transaksi"

        axios.get(url)
        .then(res => {
            this.setState({
                transaksiCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount = () => {
        this.getAdmin();
        this.getCustomer();
        this.getProduct();
        this.getTransaksi();
    }
    render(){
        return(
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col'>
                        <div className='card-body bg-warning'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='card-body mt-3'><AiFillAccountBook size={70}/></div>
                                </div>
                                <div className='col'>
                                    <div className='card-body'>
                                        <h5 className='text-center'>Total Admin</h5>
                                    </div>
                                    <h3 className='text-center'>{this.state.adminCount}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col '>
                        <div className='card-body bg-danger'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='card-body mt-3'><BsFillPersonFill size={70}/></div>
                                </div>
                                <div className='col'>
                                    <div className='card-body'>
                                        <h5 className='text-center'>Total Customer</h5>
                                    </div>
                                    <h3 className='text-center'>{this.state.customerCount}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col'>
                        <div className='card-body bg-success'>
                            <div className='row'>
                                <div className='col'>
                                    <div className='card-body mt-3'><GoPackage size={70}/></div>
                                </div>
                                <div className='col'>
                                <div className='card-body'>
                                    <h5 className='text-center'>Total Produk</h5>
                                </div>
                                <h3 className='text-center'>{this.state.productCount}</h3>
                            </div>
                                </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='card-body bg-info'>
                            <div className='row'>
                                <div className='col'>
                                <div className='card-body mt-3'><MdOutlineProductionQuantityLimits size={70}/></div>
                                </div>
                                <div className='col'>
                                <div className='card-body'>
                                    <h5 className='text-center'>Total Transaksi</h5>
                                </div>
                                <h3 className='text-center'>{this.state.transaksiCount}</h3>
                            </div>
                                </div>
                        </div>
                    </div>


                </div>
            </div>
         
        );
    }
}