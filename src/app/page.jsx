import Welcome from './components/welcome/welcome'
import ThemeToggle from './components/ThemeToggle'


export default function Page() {
  return (
<>
<div className='container'>

<ThemeToggle />
</div>
<Welcome />

</>    

  )
}
