import './welcome.css'
import '../../global.css'
import WelcomeHeader from "./welcome-header"
import WelcomeContent from "./welcome-content"

export default function Welcome(){
  return (

    <div className='welcome container  margin-top-20px margin-bottom-20px'>
      <WelcomeHeader />
      <WelcomeContent />
    </div>
  )
}