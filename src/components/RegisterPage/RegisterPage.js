import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './RegisterPage.css';

const initialState = {
	firstname: '',
	lastname: '',
	email: '',
	dob: '',
	password: '',
	confirmpassword: ''
}

class RegisterPage extends Component{
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
		const {firstname, lastname, email, dob, password, confirmpassword} = this.state;
		const {setCurrentUser} = this.props;
		if(password!==confirmpassword){
			alert('The passwords do not match');
			document.getElementById('password').value = '';
			document.getElementById('confirmpassword').value = '';
			this.setState({
				password: '',
				confirmpassword: ''
			}, () => {
				console.log(this.state);
			})
			return;
		}
		fetch('https://boiling-spire-02698.herokuapp.com/register', {
	            method: 'post',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify({
	            	firstname: firstname,
	            	lastname: lastname,
	            	email: email,
	            	dob: dob,
	            	password: password
            })
         })
		.then(response => response.json())
		.then(response => {
			if(response==='exist')
				alert('Email is already registered.Please try with another email.')
			if(response.email)
			{
				alert('Registered successfully');
				setCurrentUser({
					email: response.email,
					firstname: response.firstname
				});
				this.props.history.push('/dashboard');
			}
		})
		.catch(err => {
			console.log(err);
			alert('Error Registering new user.Please try again.')
		})
	}

	render(){
		return(
			<div className="register-page">
				<p className="register-header">
					Create New Customer Account
				</p>
				<form onSubmit={this.onSubmitHandler} className="register-form">
					<div className="register-input-div">
						<label htmlFor="firstname">First Name<span style={{color: 'red'}}>*</span></label>
						<input 
						type="text"
						className="register-form-input" 
						name="firstname"
						onChange={this.onChangeHandler}
						required
						/>
					</div>
					<div className="register-input-div">
						<label htmlFor="lastname">Last Name<span style={{color: 'red'}}>*</span></label>
						<input 
						type="text"
						className="register-form-input" 
						name="lastname"
						onChange={this.onChangeHandler}
						required
						/>
					</div>
					<div className="register-input-div">
						<label htmlFor="email">Email<span style={{color: 'red'}}>*</span></label>
						<input 
						type="text" 
						className="register-form-input" 
						name="email"
						onChange={this.onChangeHandler}
						required
						/>
					</div>
					<div className="register-input-div">
						<label htmlFor="dob">Date of Birth</label>
						<input 
						type="date" 
						className="register-form-input" 
						name="dob"
						onChange={this.onChangeHandler}
						/>
					</div>
					<div className="register-input-div">
						<label htmlFor="password">Password<span style={{color: 'red'}}>*</span></label>
						<input 
						type="password" 
						className="register-form-input" 
						name="password"
						id="password"
						onChange={this.onChangeHandler}
						required
						/>
					</div>
					<div className="register-input-div">
						<label htmlFor="confirmpassword">Confirm Password<span style={{color: 'red'}}>*</span></label>
						<input 
						type="password" 
						className="register-form-input" 
						name="confirmpassword"
						id="confirmpassword"
						onChange={this.onChangeHandler}
						required
						/>
					</div>
					<div className="register-button-div">
						<Link to="/">
							<input 
							type="button"
							className="cancel-button"
							name="cancel"
							value="Cancel"
							/>
						</Link>
						<input 
						type="submit" 
						className="form-submit" 
						name="submit"
						value="Register"
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default withRouter(RegisterPage);