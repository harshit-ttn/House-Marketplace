import { useState,useEffect} from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { Link, useNavigate} from 'react-router-dom'
import {updateDoc,doc, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import { async } from '@firebase/util'
import {toast} from 'react-toastify' 
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import {getDocs,collection,query,where,orderBy,deleteDoc} from 'firebase/firestore'
import ListingItem from '../components/ListingItem'

function Profile() {
  const auth = getAuth()
  
  const [changeDetails,setChangeDetails] = useState(false)

  const [listings, setListings] = useState(null)
  const [loading,setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  // destructuring of formData
  const { name, email } = formData

  const navigate = useNavigate()

  //
  useEffect(()=>{
    const fecthUserListings = async () =>{
      const listingRef = collection(db,'listings')

      const q = query(listingRef,where('userRef','==',auth.currentUser.uid),orderBy('timestamp','desc'))

      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc)=>{
        listings.push({
          id : doc.id,
          data : doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fecthUserListings()
  },[auth.currentUser.uid])


  // ********** Logout ***********
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  // ********** Logout *********** //

  const onSubmit=async ()=>{

    try{
      if(auth.currentUser.displayName!==name){
        // Update display name in Firebase

        await updateProfile(auth.currentUser,{
          displayName: name
        })

        // Update display name in Firestore(Database)
        const userRef = doc(db,'users',auth.currentUser.uid)
        await updateDoc(userRef,{
          // name:name
          name    
        })
      }
    }catch(error){
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,[e.target.id]:e.target.value,
    }))
  }

  const onDelete = async (listingId) =>{
    if(window.confirm('Are you sure you want to delete?')){

      const docRef = doc(db,'listings',listingId)
      await deleteDoc(docRef)

      // update our listings state
      const updatedListings = listings.filter((listing) =>
      listing.id !== listingId)

      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  return <div className='profile'>
    <header className="profileHeader">
      <p className='pageHeader'>My Profile</p>
      <button type='button' className='logOut' onClick={onLogout}>Logout</button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className='profileDetailsText'>Personal Details</p>
        <p className="changePersonalDetails" onClick={()=>{
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
          {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input type="text" name="name" id="name" className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} />

            <input type="email" name="email" id="email" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!changeDetails} value={email} onChange={onChange} />
          </form>
          </div>

          <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt="home" />
            <p>Sell or Rent Your Home</p>
            <img src={arrowRight} alt="arrow right" />
          </Link>

          {!loading && listings.length > 0 && (
            <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingList'>
              {listings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={()=>onDelete(listing.id)} onEdit={()=>onEdit(listing.id)} />
              ))}
            </ul>
            </>
          )}
    </main>
  </div>
}

export default Profile