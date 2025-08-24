export default function Footer() {
  return (
    <footer className=" text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand and description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-black">SHOE-STORE</h2>
            <p className="text-gray-600 mb-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Follow Us</h3>
              <p className="text-gray-600">
                Since the 1500s, where an unknown printer took a galley of type and scrambled.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-600 hover:text-white transition-colors">
                  <span className="sr-only text-black" >Facebook</span>
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <i className="fab fa-twitter text-lg"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact Us</h3>
            <address className="text-gray-600 not-italic">
              <p>E-Comm , 4578</p>
              <p>Marmora Road,</p>
              <p>Glasgow D04 89GR</p>
            </address>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Information</h3>
            <ul className="space-y-2 ">
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Information</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Information</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Additional sections for My Account and Our Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-12">
          {/* Spacer for first two columns */}
          <div className="lg:col-span-2"></div>

          {/* My Account Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">My Account</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Information</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Our Offers Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Our Offers</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Information</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            &copy; 2023 SHOE-STORE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}