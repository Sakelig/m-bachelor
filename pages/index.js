import { removeCookies } from "cookies-next"
import Layout from "../components/Layout"
// import getUser from "../lib/getUser"
import { useRouter } from "next/router"
// import dbConnect from "../lib/dbConnect"
// import { useUser } from "../UserContext"

export default function Home() {
  const router = useRouter()
  // const user = useUser()

  // console.log(user)

  const signoutHandler = () => {
    removeCookies("token")
    router.push("/signin")
  }

  return (
      <Layout>
        <h1>Home Page</h1>
        <p>
          This is the home page and it is protected. Only authenticated users can
          access this page.
        </p>

        {/*<p>*/}
        {/*  <strong>Name</strong>: {user.name}*/}
        {/*</p>*/}
        {/*<p>*/}
        {/*  <strong>Email</strong>: {user.email}*/}
        {/*</p>*/}

        <button onClick={signoutHandler}>Sign out</button>
      </Layout>
  )
}
