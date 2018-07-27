import React from 'react'

import {
  Flex,
  Box,
  Text,
  theme
} from 'ooni-components'

import {
  Cross,
  Tick
} from 'ooni-components/dist/icons'

import { FormattedMessage } from 'react-intl'

const StatusOKString = ({stringID}) => (
  <Flex justify='center' align='center' pb={4}>
    <Box>
      <Tick color={theme.colors.green6} size={40} />
    </Box>
    <Box>
      <Text color={theme.colors.green6} fontSize={4}><FormattedMessage id={stringID} /></Text>
    </Box>
  </Flex>
)

const StatusNotOKString = ({stringID}) => (
  <Flex justify='center' align='center' pb={4}>
    <Box>
      <Cross color={theme.colors.red6} size={40} />
    </Box>
    <Box>
      <Text color={theme.colors.red6} fontSize={4}><FormattedMessage id={stringID} /></Text>
    </Box>
  </Flex>
)

const StatusBox = ({label, value, ok}) => (
  <Flex wrap>
    <Box w={1}>
      <Text fontSize={1}>{label}</Text>
    </Box>
    <Box w={1}>
      <Text fontSize={3} color={ok ? theme.colors.blue5 : theme.colors.red6}>{value}</Text>
    </Box>
  </Flex>
)

export const FacebookMessengerDetails = ({summary}) => {
  // summary = { "DNSBlocking": false, "TCPBlocking": false, "Blocked": false }
  let likelyBlocked = summary.Blocked
  let blockingReason = ''
  let tcpStatus = 'Okay'
  let dnsStatus = 'Okay'

  if (summary.DNSBlocking === true && summary.TCPBlocking === true) {
    blockingReason = 'DNSandTCPIP'
    tcpStatus = 'Failed'
    dnsStatus = 'Failed'
  } else if (summary.DNSBlocking === true) {
    blockingReason = 'DNSOnly'
    dnsStatus = 'Failed'
  } else if (summary.TCPBlocking === true) {
    blockingReason = 'TCPIPOnly'
    tcpStatus = 'Failed'
  }

  return <div style={{width: '100%', paddingTop: '20px'}}>
    {likelyBlocked
      ? <div>
        <StatusNotOKString id='TestResults.Details.InstantMessaging.FacebookMessenger.LikelyBlocked.Hero.Title'/>
        <Text center><FormattedMessage id={`TestResults.Details.InstantMessaging.FacebookMessenger.LikelyBlocked.BlockingReason.${blockingReason}`} /></Text>
      </div>
      : <div>
        <StatusOKString stringID='TestResults.Details.InstantMessaging.FacebookMessenger.Reachable.Hero.Title' />
        <Text center><FormattedMessage id='TestResults.Details.InstantMessaging.FacebookMessenger.Reachable.Content.Paragraph.1' /></Text>
      </div>
    }

    <Flex justify='center' align='center' pt={4}>
      <Box w={1/3}>
        <StatusBox
          label={<FormattedMessage id='TestResults.Details.InstantMessaging.FacebookMessenger.TCP.Label.Title' />}
          value={<FormattedMessage id={`TestResults.Details.InstantMessaging.FacebookMessenger.TCP.Label.${tcpStatus}`} />}
          ok={tcpStatus !== 'Blocked'}
        />
      </Box>

      <Box w={1/3}>
        <StatusBox
          label={<FormattedMessage id='TestResults.Details.InstantMessaging.FacebookMessenger.DNS.Label.Title' />}
          value={<FormattedMessage id={`TestResults.Details.InstantMessaging.FacebookMessenger.DNS.Label.${dnsStatus}`} />}
          ok={dnsStatus !== 'Blocked'}
        />
      </Box>
    </Flex>
  </div>
}