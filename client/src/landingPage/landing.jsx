import React, {useState} from "react";

import Modal from "../components/UI/modal.jsx"
import AuthPage from "../authentication/authPage.jsx";

import coal from "./coal.png"
import './landing.css'

function LandingPage(){

    const [openLogin, setOpenLogin] = useState(false);

    const handleOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    return(
        <div className="landing-page">

        <Modal
            show={openLogin}
            onCancel={handleCloseLogin}
            header= "landing Collories"
            contentClass="Place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<button onClick={handleCloseLogin}>CLOSE</button>}
            >
            <AuthPage />
        </Modal>

            <header className="logo-header">
                <div><img src={coal} alt="" /></div>
            </header>
            <section className="landing-section">
                <span className="section-heading">MINISTRY OF <br /> COAL</span>
                <div className="welcome-container">
                    <div className="desc-container">
                        <div className="welcome-desc">
                            <span>The Ministry of Coal is a pivotal government ministry in India responsible for the development, regulation, and conservation of coal and lignite resources across the nation. It plays a crucial role in formulating policies that ensure the sustainable and efficient use of these resources, which are vital for the country's energy security. The ministry oversees the comprehensive administration of coal and lignite mines, ensuring adherence to environmental standards, and promoting advanced technologies for safer and more productive mining operations. Additionally, it manages the strategic planning and implementation of initiatives aimed at enhancing coal production, distribution, and pricing.</span>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src="https://img.freepik.com/premium-vector/coal-mining-extraction-industry-concept-miner-extracting-coal_1316704-6492.jpg?w=2000" alt="" />
                    </div>
                </div>
                <div className="login-container">
                    <button onClick={handleOpenLogin}>LOGIN</button>
                </div>
                <div className="founders-header">
                    <span>FOUNDERS</span>
                    <div></div>
                </div>
                <div className="founders-container">
                    <h2>Minister of Coal: ic insights to improve coal sector efficiency and safety</h2>
                    <div className="cards-container">
                        <div className="card-founder">
                            <div className="card-image"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/The_Union_Minister_for_Parliamentary_Affairs%2C_Coal_and_Mines%2C_Shri_Pralhad_Joshi.jpg" alt="" /></div>
                            <div className="card-info"><span>Arvind Singh</span> <br /><br />B.Tech in Mining Engineering from the Indian School of Mines (ISM) Dhanbad, M.Tech in Environmental Engineering from IIT Kharagpur.</div>
                        </div>
                        <div className="card-founder">
                            <div className="card-image"><img src="https://ourneta.com/wp-content/uploads/2020/01/G.-Kishan-Reddy.jpg" alt="" /></div>
                            <div className="card-info"><span>Sanjay Gupta</span> <br /><br />B.E. in Mechanical Engineering from IIT Bombay, Master's in Industrial Management from the National Institute of Industrial Engineering (NITIE) Mumbai.</div>
                        </div>
                        <div className="card-founder">
                            <div className="card-image"><img src="https://www.psuconnect.in/sdsdsd/jpg_20221212_231328_0000.jpg" alt="" /></div>
                            <div className="card-info"><span>Rajesh Verma</span> <br /><br />B.Tech in Civil Engineering from NIT Warangal, M.Sc in Geology from the Indian Institute of Science (IISc) Bangalore.</div>
                        </div>
                        <div className="card-founder">
                            <div className="card-image"><img src="https://etimg.etb2bimg.com/photo/106913421.cms" alt="" /></div>
                            <div className="card-info"><span>Deepak Patel</span> <br /><br />B.Tech in Mining Engineering from IIT BHU (Banaras Hindu University), MBA in Energy Management from IIM Ahmedabad.</div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="landing-footer">
                <div className="contact-info-container">
                    <h1>Contact Info</h1>
                    <hp>Email : ministryofcoal@gmail.com</hp>
                    <hp>Phone: +91823 23521</hp>
                    <hp>Other ways to Contact</hp>
                </div>
                <div className="legal-info-container">
                    <h1>Legal</h1>
                    <hp>Privacy Policy</hp>
                    <hp>Terms and Services</hp>
                </div>
            </footer>
            <div className="below-footer">
                <div className="below-footer-div">
                    <img src={coal} alt="" />
                    <span>MINISTRY OF COAL</span>
                </div>
            </div>
        </div>
    )
}

export default LandingPage