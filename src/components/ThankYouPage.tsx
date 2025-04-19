import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BynopsLogo from '../assets/bynops-logo.png';
import Favicon from '../assets/favicon.ico';

const ThankYouPage = () => {
  return (
    <>
      <Helmet>
        <title>Thank You | BYNOPS</title>
        <link rel="icon" type="image/x-icon" href={Favicon} />
        <meta name="description" content="Thank you for contacting BYNOPS" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-orange-200 to-blue-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex justify-center mb-12">
            <img 
              src={BynopsLogo}
              alt="Bynops Logo"
              className="h-16 object-contain"
              loading="lazy"
            />
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Thank You!
            </h1>
            
            <div className="space-y-6 max-w-lg mx-auto">
              <p className="text-xl text-gray-700">
                We've received your message and will get back to you soon.
              </p>
              
              <p className="text-gray-600">
                You should receive a confirmation email shortly.
              </p>
              
              <div className="pt-6">
                <Link 
                  to="/" 
                  className="bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg inline-block transform hover:scale-105"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;