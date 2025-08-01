import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselIndicators,
} from 'reactstrap';

import img1 from "../../assets/images/users/avatar-1.jpg";
import img2 from "../../assets/images/users/avatar-2.jpg";
import img3 from "../../assets/images/users/avatar-3.jpg";

const items = [
    {
        id: 1,
        img: null,
        name: null,
        designation: null,
        description: "Think of your patient data as rare medical pearls—our platform having multi-layered encryption, strict access protocols, and secure login mechanisms, ensuring that only the rightful diver—the dentist—can retrieve these without risk of exposure or tampering."
    },
    {
        id: 2,
        img: null,
        name: null,
        designation: null,
        description: "Just as a master librarian, our platform systematically organizes every CBCT scan, DICOM image, and OPG file along a defined, traceable, and structured digital path—so you never lose sight of history, and never misplace a single diagnostic detail."
    },
    {
        id: 3,
        img: null,
        name: null,
        designation: null,
        description: "With the intuition of a seasoned assistant and the foresight of tomorrow, our AI-powered interface gently guides users like a GPS through a vast city of radiology data—eliminating complexity, learning from usage patterns, predicting next steps, and delivering effortless navigation with the grace of a trusted co-pilot in your diagnostic journey."
    }
];

const CarouselPage = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    setTimeout(() => {
        next()
    }, [3000])
    
    const slides = items.map((item) => {
        return (
            <CarouselItem
                tag="div"
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <div className="carousel-item active h-100" style={{minHeight: 220, maxHeight: 300}}>
                    <div className="testi-contain text-white">
                        <i className="bx bxs-quote-alt-left text-light display-6"></i>

                        <h4 className="mt-2 fw-medium lh-base text-white">“{item.description}”
                        </h4>
                        {/* <div className="mt-4 pt-3 pb-5">
                            <div className="d-flex align-items-start">
                                <div className="flex-shrink-0">
                                    <img src={item.img} className="avatar-md img-fluid rounded-circle" alt="..." />
                                </div>
                                <div className="flex-grow-1 ms-3 mb-4">
                                    <h5 className="font-size-18 text-white">{item.name}
                                    </h5>
                                    <p className="mb-0 text-white-50">{item.designation}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </CarouselItem>
        );
    });

    return (
        <React.Fragment>
            <div className="col-xxl-9 col-lg-8 col-md-7">
                <div className="auth-bg pt-md-5 p-4 d-flex">
                    <div className="bg-overlay bg-primary"></div>
                    <ul className="bg-bubbles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-7">
                            <div className="p-0 p-sm-4 px-xl-0">
                                <div id="reviewcarouselIndicators" className="carousel slide" data-bs-ride="carousel">
                                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} className='carousel-indicators-rounded justify-content-start ms-0 mb-0' style={{ marginTop: '40px' }}/>
                                    <Carousel
                                        activeIndex={activeIndex}
                                        next={next}
                                        previous={previous}
                                    >
                                        {slides}

                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CarouselPage;