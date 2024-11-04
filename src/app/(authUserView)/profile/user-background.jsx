import {ButtonEditProfile} from "./edit-profile-button"
import { UserBio } from "./user-bio";

export function UserBackground(props) {
  const user = props.user;
  return (
    <div className="userBackground">
      <ButtonEditProfile />
      <UserBio user={user} /> 
    </div>
  )
}
