import React from 'react'
import { Box, Text, Button, Image } from '@skynexui/components'

export function Header({ loggedInUser }) {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Box
          styleSheet={{
            width: '120px',
            // marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <a href={`https://github.com/${loggedInUser}`} target="_blank">
            <Image
              styleSheet={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'inline-block'
                // marginRight: '8px'
              }}
              src={`https://github.com/${loggedInUser}.png`}
            />
          </a>
          <Button
            variant="tertiary"
            colorVariant="neutral"
            label="Logout"
            href="/"
          />
        </Box>
      </Box>
    </>
  )
}
