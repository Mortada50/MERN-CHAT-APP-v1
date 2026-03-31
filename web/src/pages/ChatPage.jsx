import { useAuth } from '@clerk/react'
import React from 'react'

function ChatPage() {
  const {signOut} = useAuth()
  return (
    <div>
      <button onClick={signOut}>SIGNOUT</button>
    </div>
  );
}

export default ChatPage