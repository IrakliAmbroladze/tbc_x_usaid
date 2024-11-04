import {fetchUser} from "./fetchUser"
import { AvatarName} from "./user-avatar-name"
import { UserBackground } from "./user-background"
import { useContext } from 'react';
import {AuthContext} from './context'

export async function UserProfile() {
  const user = useContext(AuthContext);
  // console.log(user)
  return (
    <div key={user.id} className="profile-card">
        
        <AvatarName user={user}/>
        <UserBackground user={user}/>
        
        
    </div>
  )
}
