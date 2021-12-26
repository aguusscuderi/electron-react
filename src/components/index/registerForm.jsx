export default function RegisterForm (props) {
    return(
        
        <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>
			<div className="signup">
				<form action="http://localhost:8080/api" method="POST">
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input onChange={props.handleChange} type="text" name="username" placeholder="User name" required=""/>
					<input onChange={props.handleChange} type="email" name="email" placeholder="Email" required=""/>
					<input onChange={props.handleChange} type="password" name="pswd" placeholder="Password" required=""/>
					<button type="submit" onClick={props.handleSubmit}>Sign up</button>
				</form>
			</div>

			<div className="login">
				<form>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input onChange={props.handleLoginChange} type="email" name="emailLogin" placeholder="Email" required=""/>
					<input onChange={props.handleLoginChange} type="password" name="pswdLogin" placeholder="Password" required=""/>
					<button onClick={props.handleLoginSubmit}>Login</button>
				</form>
			</div>
	    </div>
        
    )
}