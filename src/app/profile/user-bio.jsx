import { UserContact } from "./user-contact"
import { UserDescription } from "./user-description"

export function UserBio(props) {
  const user = props.user;
  return (
    <div className="userbio" >
      <UserDescription user={user}/>
      <UserContact user={user}/>  
    </div>
  )
}
