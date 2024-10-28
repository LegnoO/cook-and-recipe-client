import { redirect } from 'next/navigation'

export default function ChefLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return true ? <section className="user-layout">{children}</section> : redirect("/");
}
