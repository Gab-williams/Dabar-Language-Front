import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Lottie from "react-lottie";
import animationData from "public/assets/404.json";

const Custom404 = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-12 text-center mt-5 mb-5">
            <div className="inner">
            <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={300}
                width={300}
              />
            
              <h1 className="title">Page not found!</h1>
              <p>Sorry, but the page you were looking for could not be found.</p>
              
              <div className="back-totop-button cerchio d-inline-block">
                <Link href="/">
                  <span className="hover-flip-item">
                    <span data-text="Back to Homepage">Back to Homepage</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Custom404;
