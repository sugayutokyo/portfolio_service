import React from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { setupStore } from '@/store'

// ストアを作成
const store = setupStore()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
