export function handleNewMessage(
  newMessage,
  messageList,
  loggedInUser,
  SupabaseInsert,
  setMessageList,
  setMessage
) {
  const message = {
    // id: messageList.length + 1,
    from: loggedInUser,
    text: newMessage
  }

  SupabaseInsert(message)
  setMessageList([message, ...messageList])
  setMessage('')
}

export function handleDeleteMessage(id, messageList, setMessageList) {
  const newMessageList = messageList.filter(message => message.id !== id)
  setMessageList(newMessageList)
}
