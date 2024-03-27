import Link from 'next/link'

export default function AuthorSidebar() {
    return (
        <>
            <aside className="blog-sidebar">
                <div className="widget sidebar-widget">
                    <div className="tgAbout-me">
                        <div className="tgAbout-thumb">
                            <img src="/assets/img/others/about_me.png" alt="me" />
                        </div>
                        <div className="tgAbout-info">
                            <p className="intro">Hi there, I’m <span>Rosalina D.</span></p>
                            <span className="designation">Content Writer</span>
                        </div>
                        <div className="tgAbout-social">
                            <Link href="#"><i className="fab fa-facebook-f" /></Link>
                            <Link href="#"><i className="fab fa-twitter" /></Link>
                            <Link href="#"><i className="fab fa-instagram" /></Link>
                            <Link href="#"><i className="fab fa-linkedin" /></Link>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
