import { UserDescriptionComponent } from "./description-component"
import { BorderDiv } from "./border-div"

export function UserDescription(props) {
  const user = props.user;

  return (
    <div className="userDescription">
      <UserDescriptionComponent descProp="Title" descValue={user.company.title}/>
      <BorderDiv />
      <UserDescriptionComponent descProp="Company name" descValue={user.company.name}/>
      <BorderDiv />
      <UserDescriptionComponent descProp="Department" descValue={user.company.department}/>
    </div>
  )
}
