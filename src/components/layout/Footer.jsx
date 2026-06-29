import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

                {/* Restaurant Info */}
                <div>
                    <h2 className="text-2xl font-bold text-orange-500 mb-4">
                        🍽 Smart Restaurant
                    </h2>

                    <p className="text-sm leading-7">
                        Experience delicious food prepared with fresh ingredients and
                        delivered directly to your table. Track your order live while our
                        chefs prepare it.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Contact Us
                    </h3>

                    <div className="space-y-3 text-sm">

                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt />
                            Ahmedabad, Gujarat
                        </p>

                        <p className="flex items-center gap-3">
                            <FaPhoneAlt />
                            +91 98765 43210
                        </p>

                        <p className="flex items-center gap-3">
                            <FaEnvelope />
                            support@smartrestaurant.com
                        </p>

                    </div>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                        Follow Us
                    </h3>

                    <div className="flex gap-5 text-2xl">

                        <FaFacebookF className="cursor-pointer hover:text-orange-500 transition" />

                        <FaInstagram className="cursor-pointer hover:text-orange-500 transition" />

                        <FaTwitter className="cursor-pointer hover:text-orange-500 transition" />

                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-700 py-5 text-center text-sm">
                © {new Date().getFullYear()} Smart Restaurant. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;