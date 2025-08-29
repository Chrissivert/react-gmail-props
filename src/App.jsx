import { useState } from 'react'
import Header from './Header'
import EmailPage from './EmailPage'
import './styles/App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <EmailPage searchTerm={searchTerm} />
    </div>
  )
}


export default App
