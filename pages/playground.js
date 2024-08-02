import {useRouter} from "next/router";
import {useUser} from "../UserContext";
import {deleteCookie} from "cookies-next";
import Layout from "../components/Layout";
import dbConnect from "../lib/dbConnect";
import getUser from "../lib/getUser";

export default function Playground() {


    return (
        <Layout>
            <h1>Playground Page</h1>
            <p>
                Anyone can access this page
            </p>

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
