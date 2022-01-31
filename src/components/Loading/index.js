import { Box, Text } from '@skynexui/components'

export const Loading = () => {
  return (
    <Box
      styleSheet={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text tag="strong">Loading...</Text>
    </Box>
  )
}

// .shimmer {
//   background-image: linear-gradient(
//     90deg,
//     #eeeeee 0%, #eeeeee 40%,
//     #dddddd 50%, #dddddd 55%,
//     #eeeeee 65%, #eeeeee 100%
//     )

//     gackground-size: 400%;
//     animation: shimmer 1500ms infinite;
// }

// @keyframes shimmer {
//   from {background-position: 100%, 100%;}
//   to: {background-position: 0 0;}
// }
