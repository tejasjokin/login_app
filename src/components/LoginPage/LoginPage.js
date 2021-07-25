import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './LoginPage.css';

const initialState = {
	email: '',
	password: ''
}

class LoginPage extends Component{
	constructor(props){
		super(props);
		this.state = initialState;
	}

	onChangeHandler = (event) => {
		const {name, value} = event.target;
		this.setState({[name]: value}, () => {
			console.log('');
		})
	}

	onSubmitHandler = (event) => {
		event.preventDefault();
		const {email, password} = this.state;
		const {setCurrentUser} = this.props;
		fetch('https://boiling-spire-02698.herokuapp.com/login', {
	            method: 'post',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify({
	            	email: email,
	            	password: password
            })
        })
        .then(response => response.json())
        .then(response => {
        	if(response.email)
        	{
        		setCurrentUser({
        			email: response.email,
        			firstname: response.firstname
        		});
        		this.props.history.push('/dashboard');
        	}
        	else if(response==='wrong')
        	{
        		alert('Wrong Credentials');
        	}
        })
        .catch(err => {
        	console.log(err);
        	alert('Error logging in.');
        })
	}

	render(){
		return(
			<div className="login-page">
				<p className="login-header">
					Customer Login
				</p>
				<form onSubmit={this.onSubmitHandler} className="login-form">
					<div className="input-div">
						<label htmlFor="email">Email<span style={{color: 'red'}}>*</span></label>
						<input 
						type="text" 
						className="form-input" 
						name="email"
						onChange={this.onChangeHandler}
						required
						/>
					</div>
					<div className="input-div">
						<label htmlFor="password">Password<span style={{color: 'red'}}>*</span></label>
						<input 
						type="password" 
						className="form-input" 
						name="password"
						onChange={this.onChangeHandler}
						required
						/>
					</div>
					<div className="button-div">
						<Link to='/register'>
							<input 
							type="button"
							className="register-button"
							name="register"
							value="Register"
							/>
						</Link>
						<input 
						type="submit" 
						className="form-submit" 
						name="submit"
						value="Login"
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default withRouter(LoginPage);