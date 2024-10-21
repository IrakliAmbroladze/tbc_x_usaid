export function AvatarName(props) {
  const user = props.user;
  return (
    <>
    <img className="userImg" src={user.image} alt="User-image"></img>
        <div className="userName">
          <h1 style={{marginLeft: "-30px"}}>{user.firstName}</h1>
          <h1 
          style={{
            marginLeft: "10px",
            paddingTop: "0px"
            }}>{user.lastName}</h1>
        </div>
    </>
  )
}
