import React from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }  
    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username : this.state.username,
            password : this.state.password
        }
        let url = "http://localhost:8080/store/admin/auth"
        axios.post(url, data)
        .then(res => {
            if (res.data.logged){
                let name = res.data.data.name
                let admin = res.data.data
                let token = res.data.token
                localStorage.setItem("name", name)
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                window.location = '/'
            }
            else {
                window.alert("fail")
            }
        })
    }
    render(){
        return(
            <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-xl-6 mx-auto">
                                    <h3 className="display-4">LOGIN!!</h3>
                                    <form  onSubmit={(e) => this.handleLogin(e)}>
                                        <div className="form-group mb-3"> <input type='text' name='username'id="username"  placeholder='username' onChange={this.handleChange} value={this.state.username} /> </div>
                                        <div className="form-group mb-3"> <input type='password' name='password'id="pwd"  placeholder='Password' onChange={this.handleChange} value={this.state.password} /> </div>
                                        <div className="custom-control custom-checkbox mb-3"> <input id="customCheck1" type="checkbox" checked className="custom-control-input" /> <label for="customCheck1" className="custom-control-label">Remember password</label> </div> <button type="submit" className="btn btn-danger btn-block text-uppercase mb-2  rounded-pill shadow-sm">login</button>
                                        <div className="text-center d-flex justify-content-between mt-4">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}