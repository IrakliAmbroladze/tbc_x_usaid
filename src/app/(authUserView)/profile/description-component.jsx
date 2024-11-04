export function UserDescriptionComponent(props) {
  return (
    <div className="descriptionComponent">
        <b style={{fontSize: "24px", textAlign: "center"}}>{props.descValue}</b> 
        <div style={{paddingTop: "10px"}}>{props.descProp}</div> 
      </div>
  )
}
