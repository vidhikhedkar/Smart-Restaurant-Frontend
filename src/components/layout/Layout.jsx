import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            {/* <Navbar /> */}

            {/* Page Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
                {children}
            </main>

            {/* Footer */}
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;