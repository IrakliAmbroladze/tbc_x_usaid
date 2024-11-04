export function UserContact(props) {
  const user = props.user;
  return (
    <div className="userContact" >
      <div>Phone: {user.phone}</div> 
      <div>Email: {user.email}</div> 
    </div>
  )
}
