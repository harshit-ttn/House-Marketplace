import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth'


function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    'email': '',
    'password': '',
  })

  // destructuring of formData 
  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => (
      { ...prevState, [e.target.id]: e.target.value, }))
  }

  // ********** User Sign In **********
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate('/')
      }

    } catch (error) {
      console.log(error)
      toast.error('Bad User Credentials')
    }

  }
  // ********** User Sign In ********** //


  return (
    <>
      <div className="pageContainer">
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>


        <form onSubmit={onSubmit}>
          <input type="email" className='emailInput' name="email" id="email" value={email} placeholder="Email" onChange={onChange} />

          <div className="password">
            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder="password" id='password' value={password} onChange={onChange} /></div>

          <img src={visibilityIcon} alt="show password" className='showpassword' onClick={() => setShowPassword((prevState) => !prevState)} />

          <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>

          <div className="signInBar">
            <p className="signInText">
              Sign In
            </p>
            <button className="signInButton">
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <OAuth/>

        <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
      </div>
    </>
  )
}

export default SignIn