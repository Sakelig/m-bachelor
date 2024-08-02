import Link from "next/link";

export default function Layout({ children }) {
    return (
        <>
            <nav>
                <div>
                    <Link href="/">
                        Home Page
                    </Link>
                </div>

                <div>
                    <Link href="/playground">
                        Playground Page
                    </Link>
                </div>

                <div>
                    <Link href="/signup">
                        SignUp
                    </Link>
                </div>

                <div>
                    <Link href="/signin">
                        SignIn
                    </Link>
                </div>
            </nav>

            <section>{children}</section>
        </>
    );
}