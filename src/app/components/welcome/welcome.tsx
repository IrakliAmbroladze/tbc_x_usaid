import './welcome.css'
import '../../[locale]/global.css'
import WelcomeHeader from "./welcome-header"
import WelcomeContent from "./welcome-content"

export default function Welcome(){
  return (

    <div className='welcome container margin-bottom-20px'>
      <WelcomeHeader />
      <WelcomeContent />
    </div>
  )
}