import Link from "next/link";
import Layout from "@/components/layout/Layout";
import BlogSidebar2 from "@/components/elements/BlogSidebar2";

export default function Technology() {
  return (
    <>
      <Layout breadcrumbCategory="Category" breadcrumbPostTitle="Technology">
        <section className="blog-details-area pt-80 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-1">
                {/* Social links */}
                <div className="blog-details-social">
                  <ul className="list-wrap">
                    {Array.from({ length: 4 }, (_, index) => (
                      <li key={index}>
                        <Link href="#">
                          <i className={`fab fa-${index === 3 ? "share" : ["facebook-f", "twitter", "linkedin-in"][index]}`} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-xl-8 col-lg-7">
                <div className="blog-post-wrapper">
                  {/* Main article */}
                  <div className="latest__post-item">
                    <div className="latest__post-thumb tgImage__hover">
                      <Link href="/blog/1">
                        <img src="/assets/img/lifestyle/life_style07.jpg" alt="Main Article Image" />
                      </Link>
                    </div>
                    <div className="latest__post-content">
                      <ul className="tgbanner__content-meta list-wrap">
                        <li className="category">
                          <Link href="/blog">technology</Link>
                        </li>
                        <li>
                          <span className="by">By</span>{" "}
                          <Link href="/blog">alonso d.</Link>
                        </li>
                        <li>Nov 22, 2022</li>
                      </ul>
                      <h3 className="title tgcommon__hover">
                        <Link href="/blog/1">
                          The multiverse is a hypothetical group of multiple universes.
                        </Link>
                      </h3>
                      <p>
                        In partnership with Sydney startup Trace, Envato is delivering on its sustainability promise as a B-Corp
                        and meeting part of its recent commitment to the To Whom It Should Concern campaign. Envato is now
                        officially carbon commitment, as part of a comprehensive new sustainability.
                      </p>
                      <div className="latest__post-read-more">
                        <Link href="/blog/1">
                          Read More <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Additional articles */}
                  <div className="row row--10">
                    {Array.from({ length: 4 }, (_, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-sm-6 col-12 mt--20">
                        <div className="latest__post-item">
                          <div className="latest__post-thumb tgImage__hover">
                            <Link href="/blog/1">
                              <img src="/assets/img/lifestyle/life_style08.jpg" alt={`Article ${index + 2} Image`} />
                            </Link>
                          </div>
                          <div className="latest__post-content">
                            <ul className="tgbanner__content-meta list-wrap">
                              <li className="category">
                                <Link href="/blog">technology</Link>
                              </li>
                              <li>
                                <span className="by">By</span>{" "}
                                <Link href="/blog">alonso d.</Link>
                              </li>
                              <li>Nov 22, 2022</li>
                            </ul>
                            <h3 className="title tgcommon__hover">
                              <Link href="/blog/1">
                                Scientists speculate that our connection might not be held.
                              </Link>
                            </h3>
                            <p>
                              In partnership with Sydney startup Trace, Envato is delivering on its sustainability promise
                              as a B-Corp and meeting part of its recent commitment to the To Whom It Should Concern
                              campaign. Envato is now officially carbon commitment, as part of a comprehensive new
                              sustainability.
                            </p>
                            <div className="latest__post-read-more">
                              <Link href="/blog/1">
                                Read More <i className="far fa-long-arrow-right" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
{/* Main article */}
<div className="latest__post-item">
                    <div className="latest__post-thumb tgImage__hover">
                      <Link href="/blog/1">
                        <img src="/assets/img/lifestyle/life_style07.jpg" alt="Main Article Image" />
                      </Link>
                    </div>
                    <div className="latest__post-content">
                      <ul className="tgbanner__content-meta list-wrap">
                        <li className="category">
                          <Link href="/blog">technology</Link>
                        </li>
                        <li>
                          <span className="by">By</span>{" "}
                          <Link href="/blog">alonso d.</Link>
                        </li>
                        <li>Nov 22, 2022</li>
                      </ul>
                      <h3 className="title tgcommon__hover">
                        <Link href="/blog/1">
                          The multiverse is a hypothetical group of multiple universes.
                        </Link>
                      </h3>
                      <p>
                        In partnership with Sydney startup Trace, Envato is delivering on its sustainability promise as a B-Corp
                        and meeting part of its recent commitment to the To Whom It Should Concern campaign. Envato is now
                        officially carbon commitment, as part of a comprehensive new sustainability.
                      </p>
                      <div className="latest__post-read-more">
                        <Link href="/blog/1">
                          Read More <i className="far fa-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Pagination */}
                  <div className="pagination__wrap">
                    <ul className="list-wrap">
                      {Array.from({ length: 5 }, (_, index) => (
                        <li key={index} className={index === 0 ? "active" : ""}>
                          <Link href="#">{index + 1}</Link>
                        </li>
                      ))}
                      <li>
                        <Link href="#">
                          <i className="fas fa-angle-double-right" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-6">
                <BlogSidebar2 />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
