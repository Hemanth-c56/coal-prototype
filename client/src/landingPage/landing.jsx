import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Modal from "../components/UI/modal.jsx"
import AuthPage from "../authentication/authPage.jsx";

import "./landing.css";

function Landing() {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <React.Fragment>

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

      <header className="landing-header">
        <h1>Ministry of Coal</h1>
        <button onClick={handleOpenLogin}>
          <h3>Login</h3>
        </button>
      </header>
      <div className="header-image">
        <Carousel autoPlay={true} infiniteLoop={true} interval={2000}>
          <div>
              <img src="https://media.istockphoto.com/id/1317407382/photo/lignite-surface-mine-with-giant-bucket-wheel-excavator.jpg?s=612x612&w=0&k=20&c=5hbCUkxdN_WoqO3rVHcs36l7YQBf-G6rAlsXGRkIqEQ=" alt="coal-img"/>
          </div>
          <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-9mMqxWTjwLsN5-fz2HMCllf2_C8z45KFSA&usqp=CAU" alt="coal-img"/>
          </div>
          <div>
              <img src="https://png.pngtree.com/thumb_back/fw800/background/20240604/pngtree-coal-stock-pile-in-mine-image_15739403.jpg" alt="coal-img"/>
          </div>
        </Carousel>
      </div>
      <br />
      <div>
        <h1>Ministry of Coal</h1>
        <p>
          
The Ministry of Coal is a government ministry in India responsible for the development, regulation, and conservation of coal and lignite resources in the country. It oversees the overall administration of coal and lignite mines, including policies related to coal production, distribution, and pricing. Here's a brief overview:
        </p>
      </div>
      <br />
      <div>
        <h1>Founders</h1>
        <p>
        1. Minister of Coal:
ic insights to improve coal sector efficiency and safety.
        </p>
      </div>
      <br />
      <footer className="landing-footer">
        <a href="">Contact</a>
        <br />
        <a href="">Mail</a>
      </footer>
    </React.Fragment>
  );
}

export default Landing;
