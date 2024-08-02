import Layout from "../components/Layout";

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

    return {
        props: {
        }
    }
}
