/**
 * @jest-environment jsdom
 */

import React from 'react'
import { screen, render, cleanup, fireEvent } from '@testing-library/react'
import { theme } from 'ooni-components'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import English from '../../../../lang/en.json'
import { useRouter } from 'next/router'

import RunTestCard from '../RunTestCard'
import { testList } from '../../nettests'

// Mocking useRouter()
const mockPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/dashboard',
      push: mockPush
    }
  },
}))

const renderComponent = (component, locale = 'en', messages = English) => {
  return render(
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </IntlProvider>
  )
}

describe('Tests for RunTestCard component', () => {
  const router = useRouter()

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  test('All the Test Cards are mounted', async () => {
    const router = useRouter()
    testList.map((t, idx) => {
      renderComponent(
        <RunTestCard
          onClick={() =>
            router.push('/dashboard/[testGroup]', `/dashboard/${t.key}`)
          }
          key={idx}
          id={t.key}
          {...t}
        />
      )
      expect(
        screen.getByText(English[t.description.props.id])
      ).toBeInTheDocument()
    })
  })

  test('Individual Test Cards work as expected', async () => {
    const websiteDetails = testList[0]
    renderComponent(
      <RunTestCard
        onClick={() =>
          router.push('/dashboard/[testGroup]', `/dashboard/${websiteDetails.key}`)
        }
        id={websiteDetails.key}
        {...websiteDetails}
      />
    )

    const testCard = screen.getByTestId('card')
    fireEvent.click(testCard)
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard/[testGroup]', `/dashboard/${websiteDetails.key}`)
  })
})
