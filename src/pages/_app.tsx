import React from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { store } from '@/store/store'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '@/styles/theme'
import '@/styles/global.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // MaterialUIをSSRで扱う際に、MaterialUIで生成されたCSSを一度削除する
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
