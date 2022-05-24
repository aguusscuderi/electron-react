import { Link } from "react-router-dom"

export default function RegisterForm (props) {
    return(
        
        <div className="main">  
		<Link to="/api/successlogin">click</Link>	
		<input type="checkbox" id="chk" aria-hidden="true"/>
			<div className="signup">
				<form action="http://localhost:8080/api/signup" method="POST">
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input onChange={props.handleChange} type="text" name="username" placeholder="User name" required=""/>
					<input onChange={props.handleChange} type="email" name="email" placeholder="Email" required=""/>
					<input onChange={props.handleChange} type="password" name="pswd" placeholder="Password" required=""/>
					<button type="submit" onClick={props.handleSubmit}>Sign up</button>
				</form>
			</div>

			<div className="login">
				<form /*action="http://localhost:8080/login"*/ /*method="POST"*/>
				{/* <form action="http://localhost:8080/login" method="POST"> */}
					<label htmlFor="chk" aria-hidden="true">Login</label>
					{/* <label htmlFor="username">USERNAME</label> */}
					<input onChange={props.handleLoginChange} type="text" name="username" placeholder="Username" required=""/>
					{/* <label htmlFor="pswd">PSWD</label> */}
					<input onChange={props.handleLoginChange} type="password" name="pswd" placeholder="Password" required=""/>
					<button onClick={props.handleLoginSubmit}>Login</button>
				</form>
			</div>
	    </div>
        
    )
}