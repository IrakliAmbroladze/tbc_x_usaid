import avatar from '../assets/images/avatar.jpg';

export default function Profile (){
   return(
    <div className="container">
      
        <h1>User profile</h1>
        <img 
          className="avatar"
          src={avatar} 
          alt="user_photo" 
          width={100}
          height={100}
          ></img>
        <div>
          <b>სახელი: </b>
          <input placeholder='შეიყვანე სახელი'></input> 
          <br></br>
          <b>გვარი: </b>
          <input placeholder='შეიყვანე გვარი'></input>
          <br></br>
          <b>მეილი: </b>
          <input placeholder='შეიყვანე მეილი'></input>
        </div>
    </div>
   )
}