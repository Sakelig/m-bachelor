import Link from "next/link";

export default function Layout({ children }) {
    return (
        <>
            <nav>
                <Link href="/">
                    Home Page
                </Link>

                <Link href="/signup">
                    SignUp
                </Link>

                <Link href="/signin">
                    SignIn
                </Link>
            </nav>

            <section>{children}</section>
        </>
    );
}