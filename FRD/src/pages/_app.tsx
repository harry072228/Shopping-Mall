import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper ,store, useAppSelector, useAppDispatch} from '../store';
import { Provider } from 'react-redux';



function MyApp({ Component, pageProps }: AppProps) {

  return (
  <Provider store={store}>
  <Component {...pageProps} />
  </Provider>)
}


export default wrapper.withRedux(MyApp);
