import "../styles/globals.css";
import {UserContextProvider} from "../UserContext";

function MyApp({ Component, pageProps }) {
  return (
      <UserContextProvider user={pageProps.user}>
        <Component {...pageProps} />
      </UserContextProvider>
  )
}

export default MyApp;
