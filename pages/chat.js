import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import { SupabaseSelect, SupabaseInsert } from '../src/services/supabase'
import { ButtonSendSticker } from '../src/components/Buttons/ButtonSendSticker'
import { Header } from '../src/components/Header'
import appConfig from '../src/config/config.json'

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const router = useRouter()
  const loggedInUser = router.query.username

  useEffect(() => {
    SupabaseSelect(setMessageList)
  }, [])

  function handleNewMessage(newMessage) {
    const message = {
      // id: messageList.length + 1,
      from: loggedInUser,
      text: newMessage
    }

    SupabaseInsert(message)
    setMessageList([message, ...messageList])
    setMessage('')
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/earthrise.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px'
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px'
          }}
        >
          <MessageList messages={messageList} updateList={setMessageList} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              value={message}
              onChange={event => {
                const valor = event.target.value
                setMessage(valor)
              }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleNewMessage(message)
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200]
              }}
            />
            <ButtonSendSticker
              onStickerClick={sticker => {
                handleNewMessage(`:sticker: ${sticker}`)
              }}
            />
            <Button
              type="submit"
              label="Enviar"
              onClick={event => {
                event.preventDefault()
                handleNewMessage(message)
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600]
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function MessageList(props) {
  // console.log(props.updateList)

  function deleteMessage(id) {
    const newList = props.messages.filter(message => message.id !== id)
    props.updateList(newList)
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px'
      }}
    >
      {props.messages.map(message => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700]
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                display: 'flex'
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px'
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text tag="strong">{message.from}</Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300]
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Button
                type="text"
                label="X"
                onClick={event => {
                  event.preventDefault()
                  deleteMessage(message.id)
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals['000'],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600]
                }}
              />
            </Box>
            {/* {message.text} */}
            {message.text.startsWith(':sticker:') ? (
              <Image src={message.text.replace(':sticker:', '')} />
            ) : (
              message.text
            )}
          </Text>
        )
      })}
    </Box>
  )
}
