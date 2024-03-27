import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";

export default function Privacy() {
  return (
    <>
      <Layout breadcrumbCategory="Privacy Policy">
        <div className="hero-section about gap mt-5 mb-5 mb-lg-10">
          <div className="container col-lg-6"></div>
          <div className="container col-lg-6">
            <div className="row align-items-left justify-content-left">
              <div
                className="col text-left "
                data-aos="fade-up"
                data-aos-delay={200}
                data-aos-duration={300}
              >
                <div className="about-text text-black">
                  <h2>Privacy and Data Protection Policy for Dabar Media</h2>
                  <h5 className="text-left mt-4">Introduction:</h5>
                  <p className="text-left">
                    Welcome to Dabar Media. Your privacy and data protection are
                    of utmost importance to us. This policy outlines our
                    practices regarding the collection, use, and protection of
                    your personal data. This policy complies with both United
                    States and European Union guidelines.
                  </p>
                  <h5 className="text-left"> Data Collection:</h5>
                  <p>
                    We collect personal data when you interact with our website,
                    such as when you subscribe to our newsletter, comment on
                    articles, or contact us. The data collected may include your
                    name, email address, and other contact information.
                  </p>
                  <h5 className="text-left">Use of Data:</h5>
                  <p>
                    Your data is used to personalize your experience, provide
                    access to our digital content, send periodic emails related
                    to our services, and improve our website offerings. We may
                    also use your information to respond to inquiries,
                    questions, and other requests.{" "}
                  </p>
                  <h5 className="text-left"> Data Protection:</h5>
                  <p>
                    We implement a variety of security measures to maintain the
                    safety of your personal information. Our website is
                    regularly scanned for security holes and known
                    vulnerabilities to make your visit as safe as possible.
                  </p>
                  <h5 className="text-left"> Cookies:</h5>
                  <p>
                    Our website may use "cookies" to enhance the user
                    experience. Cookies help us understand and save your
                    preferences for future visits and compile aggregate data
                    about site traffic and interaction.
                  </p>
                  <h5 className="text-left"> User Rights Under GDPR:</h5>
                  <p>
                    If you are within the European Union, you have rights under
                    the General Data Protection Regulation (GDPR) including: -
                    The right to access, update, or delete the information we
                    have on you. - The right of rectification. - The right to
                    object. - The right of restriction. - The right to data
                    portability.
                  </p>
                  <h6 className="text-left"> Introduction:</h6>
                  <p>
                    Welcome to Dabar Media. Your privacy and data protection are
                    of utmost im User Rights Under US Law: If you are in the
                    United States, you have the right to request information
                    about how your data is being used and the right to request
                    the deletion of your personal data.
                  </p>
                  <h6 className="text-left"> Introduction:</h6>
                  <p>
                    Welcome to Dabar Media. Your privacy and data protection are
                    of utmost im User Rights Under US Law: If you are in the
                    United States, you have the right to request information
                    about how your data is being used and the right to request
                    the deletion of your personal data.
                  </p>
                  <h6 className="text-left"> Consent:</h6>
                  <p>
                    By using our site, you consent to our website's privacy
                    policy.
                  </p>
                  <h6 className="text-left">Changes to Our Privacy Policy:</h6>
                  <p>
                    We reserve the right to update this privacy policy at any
                    time. When we do, we will revise the updated date at the
                    bottom of this page. We encourage users to frequently check
                    this page for any changes.
                  </p>
                  <h6>Contacting Us:</h6>
                  <p>
                    If there are any questions regarding this privacy policy,
                    you may contact us using the information below:
                    
                  </p>
                  <h6>hello@thedabar.com</h6>
                  <p>Effective Date: This policy is effective
                    as of 12/01/2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
