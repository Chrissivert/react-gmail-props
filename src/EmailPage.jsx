import { useState } from 'react'
import initialEmails from './data/emails'
import Sidebar from './Sidebar'
import EmailItem from './EmailItem'

const getUnreadEmails = emails => emails.filter(email => !email.read)
const getStarredEmails = emails => emails.filter(email => email.starred)

function EmailPage({searchTerm}) {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')

  const unreadEmails = getUnreadEmails(emails)
  const starredEmails = getStarredEmails(emails)

  const toggleStar = targetEmail => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    )
  }

  const toggleRead = targetEmail => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === targetEmail.id
          ? { ...email, read: !email.read }
          : email
      )
    )
  }

  // Filtering logic
  let filteredEmails = emails
  if (hideRead) {
    filteredEmails = getUnreadEmails(filteredEmails)
  }
  if (currentTab === 'starred') {
    filteredEmails = getStarredEmails(filteredEmails)
  }
  if (searchTerm) {
    const searchTermLowerCase = searchTerm.toLowerCase()
    filteredEmails = filteredEmails.filter(
      email =>
        email.title.toLowerCase().includes(searchTermLowerCase) ||
        email.sender.toLowerCase().includes(searchTermLowerCase)
    )
  }

  return (
    <>
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        unreadEmails={unreadEmails}
        starredEmails={starredEmails}
        hideRead={hideRead}
        setHideRead={setHideRead}
      />

      <main className="emails">
        <ul>
          {filteredEmails.map(email => (
            <EmailItem
              key={email.id}
              email={email}
              toggleRead={toggleRead}
              toggleStar={toggleStar}
            />
          ))}
        </ul>
      </main>
    </>
  )
}

export default EmailPage
