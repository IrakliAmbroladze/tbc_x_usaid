import {fetchUser} from "./fetchUser"
import { AvatarName} from "./user-avatar-name"
import { UserBackground } from "./user-background"

export async function UserProfile() {
  const user = await fetchUser();
  return (
    <div key={user.id} className="profile-card">
        
        <AvatarName user={user}/>
        <UserBackground user={user}/>
        
        
    </div>
  )
}
