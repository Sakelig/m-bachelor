import { deleteCookie } from "cookies-next"
import Layout from "../components/Layout"
import { useRouter } from "next/router"
import { useUser } from "../UserContext"
import getUser from "../lib/getUser";
import dbConnect from "../lib/dbConnect";

export default function Home(props) {
  const router = useRouter()
  const user = useUser()

  console.log(user, props)

  const signoutHandler = () => {
    deleteCookie("token")
    router.push("/signin")
  }

    return (
      <Layout>
        <h1>Home Page</h1>
        <p>
          This is the home page and it is protected. Only authenticated users can
          access this page.
        </p>

        <p>
          <strong>Name</strong>: {user.name}
        </p>
        <p>
          <strong>Email</strong>: {user.email}
        </p>

      <p>
          <strong>password</strong>: {user.password}
      </p>

        <button onClick={signoutHandler}>Sign out</button>
      </Layout>
  )
}
export async function getServerSideProps({ req, res }) {
    await dbConnect()

    const user = await getUser(req, res)

    if (!user) {
        return {
            redirect: {
                permanent: false,
                destination: "/signin"
            },
            props: {}
        }
    }
    return {
        props: {
            user
        }
    }
}
