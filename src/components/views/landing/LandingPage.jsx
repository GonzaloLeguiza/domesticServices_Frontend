import { useState } from "react";
import { Link } from "react-router-dom";
import services from "./img/services.png";
import logo from "./img/logo.png";
import styles from "./LandingPage.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactStars from "react-rating-stars-component";

const LandingPage = () => {
  const [clickMenu, setClickMenu] = useState(false);

  const handleClick = () => {
    setClickMenu(!clickMenu);
  };





  return (
    <div>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <Link to="#" id="menu" className={styles.menu} onClick={handleClick}>
            Menu
          </Link>
          <div
            className={`${styles.links} ${
              clickMenu ? styles.open : styles.close
            }  ${styles.close}`}
            id="links"
          >
            <Link to="/home" className={`${styles.link} ${styles.top}`}>
              Home
            </Link>
            <Link to="/about" className={styles.link}>
              About
            </Link>
            <Link to="/contacto" className={styles.link}>
              Contacto{" "}
            </Link>
          </div>
        </nav>

        <div className={styles.content}>
          <div className={styles.text}>
            <img src={logo} alt="logo" className={styles.logo} />
            <h1> Workify</h1>
            <h2>Quality servives in hand</h2>
            <Link to="/home" className={styles.btn}>
              {" "}
              Hire us now
            </Link>
          </div>

          <div>
            <img src={services} alt="" className={styles.img} />
          </div>
        </div>
        <div className={styles.cont}>
          <div className={styles.box1}>
          <form id="myForm">
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email" required />
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-4">Soy real</div>
                <div class="col-sm-8">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck1" required />
                        <label class="form-check-label" for="gridCheck1">No soy un robot</label>
                    </div>
                </div>
            </div>

            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary" id="submitButton" >Enviar formulario</button>
                </div>
            </div>
        </form>
          </div>

          <div className={styles.box2}>
            <div className={styles.carouselContainer}>
            <Carousel
  autoPlay
  interval={4000}
  showThumbs={false}
  infiniteLoop
>
  <div>
    <p className={styles.comment}>
      Contrate a un servicio de Pintura y la verdad estupendo
    </p>
    <p className={styles.author}>- John Doe</p>
    <div className={styles.stars}>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
    </div>
  </div>
  <div>
    <p className={styles.comment}>
      Me recomendo un amigo para contratar a un plomero y me destapo la cañeria
    </p>
    <p className={styles.author}>- Jane Smith</p>
    <div className={styles.stars}>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
    </div>
  </div>
  <div>
    <p className={styles.comment}>
      Muy buenos servicios la verdad
    </p>
    <p className={styles.author}>- David Johnson</p>
    <div className={styles.stars}>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
      <span>*</span>
    </div>
  </div>
</Carousel>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,128L80,144C160,160,320,192,480,176C640,160,800,96,960,80C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;

/*

      <div className={styles.carouselContainer}>
        
        <Carousel autoPlay interval={3000} showThumbs={false} infiniteLoop>
          <div>
            <p className={styles.comment}>
              Contrate a un servicio de Pintura y la verdad estupendo
            </p>
            <p className={styles.author}>- John Doe</p>
            <ReactStars count={6} size={24} activeColor="#ffd700" />
          </div>
          <div>
            <p className={styles.comment}>
              Vestibulum nec turpis ac neque commodo ultricies in ac turpis.
            </p>
            <p className={styles.author}>- Jane Smith</p>
            <ReactStars count={6} size={24} activeColor="#ffd700" />
          </div>
          <div>
            <p className={styles.comment}>
              Nullam vitae lectus id est pellentesque commodo id et sem.
            </p>
            <p className={styles.author}>- David Johnson</p>
            <ReactStars count={6} size={24} activeColor="#ffd700" />
          </div>
        </Carousel>
      </div>

      */