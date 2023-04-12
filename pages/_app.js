import { Provider } from 'react-redux'
import Layout from '../components/layout'


import '../styles/_global.scss'
import { wrapper } from "../store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


 function App({ Component, pageProps }) {
  const store = useStore((state) => state);


  return (
    <PersistGate persistor={store.__persistor} loading={
      <Layout style={{transform: 'scale(0)'}}>
        <Component {...pageProps} />
      </Layout>
    }>
    <Layout style={{transform: 'scale(0)'}}>
        <Component {...pageProps} />
      </Layout>
    </PersistGate>
  )
}

export default wrapper.withRedux(App);