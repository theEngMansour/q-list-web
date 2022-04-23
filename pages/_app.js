import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import msgs from 'site-settings/site-translations';
import RTL from 'site-settings/RTL'
import StateContextProvider from './StateContext';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import { IntlProvider } from 'react-intl';
import '../styles/fonts.css';
import '../styles/globals.css';
import "../styles/index.css"

const locale = 'ar';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, ...appProps } = props;
  //Hydration failed because the initial UI does not match what was rendered on the server.
  const [showChild, setShowChild] = useState(false)
  const [lang, setLang] = useState('ar')

  useEffect(() => {
    setShowChild(true)
  }, [])

  if(!showChild){
    return null;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>كـيو ليست | QList</title>
       </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <IntlProvider locale={lang} messages={msgs[lang]}>
          <StateContextProvider>
            <RTL>
              <CssBaseline/>
              {typeof window === 'undefined'? (<></>) : (<Component {...pageProps} />)}
            </RTL>
          </StateContextProvider>
        </IntlProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};


/*         
{ 
  [`/admain`].includes(appProps.router.pathname) &&
  <Layout fonts={{Bold: 'BalooBold', Regular: 'BalooRegular'}}>
    <Component {...pageProps}/>
  </Layout>
}  
*/


/* 
  const [lang, setLang] = useState('ar')
  const [langDefault, setLangDefault] = useState()
  const [buttonLang, setButtonLang] = useState(true)

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  const locale = langDefault;
  const changeLang = () => {
    setLang('en')
    setButtonLang(!buttonLang)
    saveToLocalStorage('lang', lang)
    setLangDefault(JSON.parse(localStorage.getItem('lang')))
    console.log(langDefault)
    
    if(buttonLang) {
      setLang('ar')
  
      saveToLocalStorage('lang', lang)
    } 
  }
 */  