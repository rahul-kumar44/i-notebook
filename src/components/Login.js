import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})  
    //let history = useHistory();
    const navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {              
               'Content-Type': 'application/json',
               },
               body: JSON.stringify({email: credentials.email,password: credentials.password})
          });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            //history.push("/")
            props.showAlert("logged in Successfully", "success")
            navigate('/');

        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }          
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }

  return (
    <div className="mt-3">
        <h2>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" value={credentials.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" value={credentials.password} name="password" onChange={onChange} id="password" placeholder="Password"/>
            </div>
            
            <button type="submit" className="btn btn-primary my-2">Submit</button>
        </form>
    </div>
  )
} 

export default Login