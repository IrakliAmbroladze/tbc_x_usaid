import WelcomeMessage from './welcome-message'
import WelcomeImage from './welcome-image'

export default function WelcomeContent(){
  return (
    <div className='welcomeContent'>
      <WelcomeMessage />
      <WelcomeImage />
    </div>
  )
}