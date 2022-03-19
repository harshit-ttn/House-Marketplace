import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {db} from '../firebase.config'
import { async } from '@firebase/util'
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    'name':'',
    'email': '',
    'password': '',
  })

  // destructuring of formData 
  const {name, email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState)=>(
      {...prevState,[e.target.id]:e.target.value,}))
  }

  
  // ********* Register User  *********
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth,email,password)

      const user = userCredential.user

      updateProfile(auth.currentUser,{
        displayName:name
      })

      console.log(auth)
      console.log(userCredential)
      console.log(user)

      // ***** Add user to Firestore(database)  ********
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp= serverTimestamp()

      await setDoc(doc(db,'users',user.uid),formDataCopy)

      // ***** Add user to Firestore(database)  ******** //

      navigate('/')

    } catch (error) {
      console.log(error)
      toast.error('Something went wrong with registeration')
    }
  }
  // ********* Register User  ********* //


  return (
    <>
      <div className="pageContainer">
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        
          <form onSubmit={onSubmit}>
          <input type="text" className='nameInput' name="name" id="name" value={name} placeholder="Name" onChange={onChange} />

            <input type="email" className='emailInput' name="email" id="email" value={email} placeholder="Email" onChange={onChange} />

            <div className="password">
              <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder="password" id='password' value={password} onChange={onChange} /></div>

            <img src={visibilityIcon} alt="show password" className='showpassword' onClick={() => setShowPassword((prevState) => !prevState)} />

            <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>

            <div className="signUpBar">
              <p className="signUpText">
                Sign Up
              </p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* Google OAuth */}
          <OAuth/>

          <Link to='/sign-in' className='registerLink'>Sign In Instead</Link>
      </div>
    </>
  )
}

export default SignUp