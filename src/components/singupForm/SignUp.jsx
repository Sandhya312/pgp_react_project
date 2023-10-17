import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from  './SignUp.module.css';

const SignUp=()=> {

    const navigate = useNavigate();

    useEffect(() => {
        let localStorageData = localStorage.getItem("userData")
        let fetchdata = JSON.parse(localStorageData);

        if(fetchdata){
            navigate("/");
        } 
        
    
    }, [navigate]);
    
 

    let formData = {
        name: "",
        userName: "",
        email: "",
        mobile: "",
        checkBox: false,
    }    

    let Errors = {
        nameIsValid : "",
        usernameIsValid: "",
        emailIsValid: "",
        mobileIsValid: "",
        checkBoxIsValid: ""
    };    


    const [signUpData, setSignUpData] = useState(formData);
    const [error, setError] = useState(Errors);

    const EmailValidate=(email)=> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validation = () => {
        let errors = {...Errors};
 

        if(signUpData.name.trim() === ""){
            errors.nameIsValid = "Name is required";
        }else if(signUpData.name.trim().length < 8){
            errors.nameIsValid = "Minimum 8 characters required";
        }

        if(signUpData.userName === ""){
            errors.usernameIsValid = "Username is required";
        }else if(signUpData.userName.length < 8){
            errors.usernameIsValid = "Minimum 8 characters required";
        }

        if(signUpData.email === ""){
            errors.emailIsValid = "Email is required";
        }else if(!EmailValidate(signUpData.email)){
            errors.emailIsValid = "Enter a valid email";
        }

        if(signUpData.mobile === ""){
            errors.mobileIsValid = "Mobile no. is required";
        }else if(signUpData.mobile.length !== 10){
            errors.mobileIsValid = "Mobile no. must contain 10 digits";
        }

        if(signUpData.checkBox === false){
            errors.checkBoxIsValid = "check the checkbox to signup"
        } 


        if(errors.nameIsValid.length ===0 && errors.usernameIsValid.length === 0 && errors.emailIsValid.length === 0 && errors.mobileIsValid.length === 0 &&
         errors.checkBoxIsValid.length === 0 ){
      
            localStorage.setItem('userData', JSON.stringify({...signUpData}))
            navigate('/categories');
        } else {
          
            setError(errors);
            navigate('/');
        }
    }

    const SubmitHandler = (e) =>{
        e.preventDefault();
        validation();
    }

    return (
        <div className={classes.Container}>
            <section className={classes.sideImage}>
                <h1>Discover new things on Superapp</h1>
            </section>

            <section className={classes.signupPage}>
                <form onSubmit={(e)=>{SubmitHandler(e)}} className={classes.signupContainer}>
                    <div className={classes.heading}>
                    <h1>Super App</h1>
                    <h2>Create your new account</h2>
                    </div>
                    <div className={classes.input}>
                        <input type="text" onChange={(e)=>{setSignUpData({...signUpData, name: e.target.value})}} placeholder='Name' />
                        <p>{error.nameIsValid && `${error.nameIsValid}`}</p>
                    </div>
                    <div className={classes.input}>
                        <input type="text" onChange={(e)=>{setSignUpData({...signUpData, userName: e.target.value})}} placeholder='UserName' />
                        <p>{error.usernameIsValid && `${error.usernameIsValid}`}</p>
                    </div>
                    <div className={classes.input}>
                        <input type="email" onChange={(e)=>{setSignUpData({...signUpData, email: e.target.value})}} placeholder='Email' />
                        <p>{error.emailIsValid && `${error.emailIsValid}`}</p>
                    </div>
                    <div className={classes.input}>
                        <input type="number" onChange={(e)=>{setSignUpData({...signUpData, mobile: e.target.value})}} placeholder='Mobile' />
                        <p>{error.mobileIsValid && `${error.mobileIsValid}`}</p>
                    </div>
                    <div className={classes.checkBox}>
                        <input type="checkbox" checked={signUpData.checkBox} onChange={(e)=>{setSignUpData({...signUpData, checkBox: !signUpData.checkBox})}} />
                        <span>Share my registration data with Superapp</span>
                        <p>{error.checkBoxIsValid && `${error.checkBoxIsValid}`}</p>
                    </div>

                    <button>SIGN UP</button>
                    <p>By clicking on Sign up. you agree to Superapp <span>Terms and Conditions of Use</span></p>
                    <p>To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span>Privacy Policy</span></p>
                </form>
            </section>
        </div>
    )
}

export default SignUp;