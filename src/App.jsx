import { useState } from "react";

import {
  Search,
  CalendarDays,
  Phone,
  UserRound,
  ChevronDown,
  ChevronRight,
  Plus,
  Users,
  ClipboardList,
  BookOpen,
  MapPin,
} from "lucide-react";

import "./App.css";

import retinaHero from "./assets/retina-hero.jpg";



/* =========================================================
   COLORS
========================================================= */

const colors = {
  red: "#A51C30",
  blue: "#3774BE",
  blue1: "#ae3244",
  white: "#FFFFFF",
  bg: "#FFFFFF",
  border: "#E5E7EB",
  dark: "#1a2340",
  body: "#2F3A4A",
  muted: "#4B5563",
};


/* =========================================================
   PATIENT EDUCATION DATA
========================================================= */

const educationData = {
  "Retina Treatments": [
    "Untreated retinal diseases & blindness",
    "Retinal detachment: signs & treatment",
    "Common retinal diseases overview",
    "Retinal disease & cataract surgery",
  ],

  "Cataract Surgery": [
    "Understanding cataracts",
    "Cataract surgery: what to expect",
    "Cataract surgery recovery guide",
    "When is cataract surgery needed?",
  ],

  "Glaucoma Treatments": [
    "Understanding glaucoma",
    "Glaucoma symptoms & diagnosis",
    "Glaucoma treatment options",
    "Protecting your vision from glaucoma",
  ],

  "Dry Eye Treatments": [
    "Understanding dry eye disease",
    "Dry eye symptoms & causes",
    "Dry eye treatment options",
    "How to manage chronic dry eyes",
  ],

  "Low Vision": [
    "Understanding low vision",
    "Low vision signs & symptoms",
    "Living with low vision",
    "Low vision treatment & resources",
  ],
};


/* =========================================================
   APP
========================================================= */

function App() {

  /*
     This controls the RIGHT Education Blogs section.

     Whenever the user hovers a treatment on the LEFT,
     this value changes.
  */

  const [activeTreatment, setActiveTreatment] =
    useState("Retina Treatments");


  const activeBlogs =
    educationData[activeTreatment];


  return (
    <div
      className="retina-page"
      style={{
        "--red": colors.red,
        "--blue": colors.blue,
        "--blue1": colors.blue1,
        "--white": colors.white,
        "--bg": colors.bg,
        "--border": colors.border,
        "--dark": colors.dark,
        "--body": colors.body,
        "--muted": colors.muted,
      }}
    >


      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="top-header">

        <div className="logo-section">

          <div className="logo-mark">
            <div className="logo-eye">
              <div className="logo-pupil"></div>
            </div>
          </div>

          <div className="logo-text">

            <div className="logo-title">
              Retina Consultants of Boston
            </div>

            <div className="logo-tagline">
              Preserving the Gift of Sight
            </div>

          </div>

        </div>


        <div className="header-actions">

          <button className="search-button">
            <Search size={21} />

            <span>
              Search
            </span>
          </button>


          <button className="header-appointment">

            <CalendarDays size={21} />

            <span>
              Book Your Own Appointment
            </span>

          </button>


          <a
            href="tel:9788545090"
            className="header-phone"
          >

            <Phone size={21} />

            <span>
              (978)-854-5090
            </span>

          </a>

        </div>

      </header>



      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="main-navigation">


        {/* FIND A DOCTOR */}

        <div className="nav-item">

          <button className="nav-button">

            <span>
              Find a Doctor
            </span>

            <ChevronDown size={17} />

          </button>


          <div className="normal-dropdown">

            <a href="#doctors">
              Our Doctors
            </a>

            <a href="#specialists">
              Retina Specialists
            </a>

            <a href="#optometrists">
              Optometrists
            </a>

          </div>

        </div>



        {/* WHO WE ARE */}

        <div className="nav-item">

          <button className="nav-button no-arrow">
            Who We Are
          </button>

        </div>



        {/* EYE CONDITIONS WE TREAT */}

        <EyeCondition />



        {/* =================================================
            PATIENT EDUCATION
        ================================================= */}

        <div className="nav-item patient-education">

          <button className="nav-button patient-education-button">

            <span>
              Treatments
            </span>

            <ChevronDown
              size={17}
              className="patient-chevron"
            />

          </button>



          {/* =================================================
              MEGA MENU
          ================================================= */}

          <div className="education-mega-menu">


            {/* HEADER */}

            <div className="education-header">

              <div className="education-eyebrow">
                LEARN ABOUT YOUR EYES
              </div>

              <h2>
                Treatments &amp; Procedures
              </h2>

              <p>
                Hover a treatment to see related education blogs.
              </p>

            </div>



            {/* =================================================
                TWO COLUMNS
            ================================================= */}

            <div className="education-columns">


              {/* =================================================
                  LEFT — TREATMENTS
              ================================================= */}

              <div className="education-card treatment-card">

                <h3>
                  TREATMENT &amp; PROCEDURES
                </h3>


                <div className="treatment-list">

                  {Object.keys(educationData).map(
                    (treatment) => (

                      <div
                        key={treatment}

                        className={
                          `treatment-item ${
                            activeTreatment === treatment
                              ? "active"
                              : ""
                          }`
                        }

                        onMouseEnter={() =>
                          setActiveTreatment(treatment)
                        }
                      >

                        <ChevronRight
                          size={17}
                        />

                        <span>
                          {treatment}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>



              {/* =================================================
                  RIGHT — EDUCATION BLOGS
              ================================================= */}

              <div className="education-card blog-card">

                <h3>
                  EDUCATION BLOGS
                </h3>


                <div className="blog-list">

                  {activeBlogs.map(
                    (blog, index) => (

                      <div
                        key={index}
                        className="blog-item"
                      >

                        <ChevronRight
                          size={17}
                        />

                        <span>
                          {blog}
                        </span>

                      </div>

                    )
                  )}

                </div>


                <a
                  href="#blogs"
                  className="read-more"
                >
                  Read more →
                </a>

              </div>

            </div>

          </div>

        </div>



        {/* PLAN YOUR VISIT */}

        <div className="nav-item">

          <button className="nav-button">

            <span>
              Plan Your Visit
            </span>

            <ChevronDown size={17} />

          </button>


          <div className="normal-dropdown">

            <a href="#appointment">
              Book an Appointment
            </a>

            <a href="#locations">
              Our Locations
            </a>

            <a href="#insurance">
              Insurance &amp; Billing
            </a>

            <a href="#expect">
              What to Expect
            </a>

          </div>

        </div>



        {/* REFERRING PHYSICIANS */}

        <div className="nav-item">

          <button className="nav-button">

            <span>
              Referring Physicians
            </span>

            <ChevronDown size={17} />

          </button>


          <div className="normal-dropdown">

            <a href="#refer">
              Refer a Patient
            </a>

            <a href="#resources">
              Physician Resources
            </a>

            <a href="#contact">
              Contact Us
            </a>

          </div>

        </div>

      </nav>



      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <img
          src={retinaHero}
          alt="Eye"
          className="hero-image"
        />

        <div className="hero-overlay"></div>


        <div className="hero-content">

          <h1>
            Preserving the Gift of Sight
          </h1>

          <h2>
            Compassion Backed by Expertise
          </h2>

          <p className="hero-description">

            Our eyecare specialists and eye doctors use
            cutting-edge technology and therapies to help
            you preserve the gift of sight.

          </p>


          <div className="hero-buttons">

            <button className="hero-primary-button">

              <CalendarDays size={21} />

              <span>
                Book Your Own Appointment
              </span>

            </button>


            <button className="hero-secondary-button">

              <UserRound size={21} />

              <span>
                Find a Doctor
              </span>

            </button>

          </div>

        </div>



        {/* =================================================
            QUICK ACTION BAR
        ================================================= */}

        <div className="quick-actions">

          <QuickAction
            icon={<Users size={27} />}
            title="Patients & Visitors"
          />

          <QuickAction
            icon={<ClipboardList size={27} />}
            title="Diagnostic Testing Center"
          />

          <QuickAction
            icon={<BookOpen size={27} />}
            title="Resources"
          />

          <QuickAction
            icon={<MapPin size={27} />}
            title="Our Offices"
          />

          <button className="quick-appointment">

            <CalendarDays size={22} />

            <span>
              Book Your Own Appointment
            </span>

          </button>

        </div>

      </section>



      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="stats-section">

        <Stat
          number="60+"
          text="Combined Years of Trusted Eye Care"
        />

        <Stat
          number="50,000+"
          text="Combined Surgical Cases"
        />

        <Stat
          number="4"
          text="Board-Certified Specialists"
        />

        <Stat
          number="300,000+"
          text="Total Patient Visits"
        />

      </section>

    </div>
  );
}




/* =========================================================
   EYE CONDITIONS WE TREAT
   Progressive hover + click navigation
========================================================= */

const eyeConditionData = [
  {
    id: "retina",
    title: "Retina",
    treatments: [
      {
        id: "medical-retina",
        title: "Medical Retina",
        description:
          "Injections, medications, laser, and monitoring for medical retinal conditions.",
        conditions: [
          {
            id: "retinal-vein-occlusions",
            title: "Retinal Vein Occlusions",
            href: "#retinal-vein-occlusions",
          },
          {
            id: "age-related-macular-degeneration",
            title: "Age Related Macular Degeneration",
            href: "#age-related-macular-degeneration",
          },
          {
            id: "diabetic-retinopathy",
            title: "Diabetic Retinopathy",
            href: "#diabetic-retinopathy",
          },
          {
            id: "posterior-segment-inflammation",
            title: "Inflammation of the Posterior Segment",
            href: "#posterior-segment-inflammation",
          },
        ],
      },
      {
        id: "surgical-retina",
        title: "Surgical Retina",
        description:
          "Surgical care for retinal tears, detachments, macular holes, membranes, and vitreomacular conditions.",
        conditions: [
          {
            id: "retinal-tears-pvd-retinal-detachment",
            title: "Retinal Tears & PVD & Retinal Detachment",
            href: "#retinal-tears-pvd-retinal-detachment",
          },
          {
            id: "epiretinal-membranes",
            title: "Epiretinal Membranes",
            href: "#epiretinal-membranes",
          },
          {
            id: "macular-holes",
            title: "Macular Holes",
            href: "#macular-holes",
          },
          {
            id: "vitreomacular-traction-syndrome",
            title: "Vitreomacular Traction Syndrome",
            href: "#vitreomacular-traction-syndrome",
          },
        ],
      },
    ],
  },

  {
    id: "cataract",
    title: "Cataract",
    treatments: [
      {
        id: "cataract-surgery",
        title: "Cataract Surgery",
        description:
          "Routine and complex cataract surgery, surgical evaluation, femtosecond laser options, and IOL selection.",
        href: "#cataract-surgery",
        conditions: [],
      },
      {
        id: "cataract-lens-replacement",
        title: "Cataract Surgery Options / Lens Replacement",
        description:
          "Lens options including multifocal and toric IOLs with personalized surgical planning.",
        href: "#cataract-lens-replacement",
        conditions: [],
      },
    ],
  },

  {
    id: "glaucoma",
    title: "Glaucoma",
    treatments: [
      {
        id: "glaucoma-laser-treatment",
        title: "Glaucoma Laser Treatment",
        description:
          "Laser-based glaucoma treatment and when it may be appropriate.",
        href: "#glaucoma-laser-treatment",
        conditions: [],
      },
      {
        id: "glaucoma-surgery-migs",
        title: "Glaucoma Surgery & MIGS",
        description:
          "Surgical management, minimally invasive glaucoma surgery, and glaucoma stents.",
        href: "#glaucoma-surgery-migs",
        conditions: [],
      },
    ],
  },

  {
    id: "dry-eyes",
    title: "Dry Eyes",
    treatments: [
      {
        id: "dry-eye-treatment",
        title: "Dry Eye Treatment",
        description:
          "Treatment options including drops, gels and ointments, heat treatment, punctal plugs, and laser.",
        href: "#dry-eye-treatment",
        conditions: [],
      },
    ],
  },

  {
    id: "low-vision",
    title: "Low Vision",
    treatments: [
      {
        id: "low-vision-care",
        title: "Low Vision Care",
        description:
          "Evaluation, management, and support for people living with reduced vision.",
        href: "#low-vision-care",
        conditions: [],
      },
    ],
  },

  {
    id: "routine-eye-exams",
    title: "Routine Eye Exams",
    treatments: [
      {
        id: "routine-eye-exams",
        title: "Routine Eye Exams",
        description:
          "Comprehensive routine eye examinations and ongoing eye health evaluation.",
        href: "#routine-eye-exams",
        conditions: [],
      },
    ],
  },
];

function EyeCondition() {
  const [isOpen, setIsOpen] = useState(false);

  // null = only the first column is visible.
  const [activeConditionId, setActiveConditionId] = useState(null);

  // null = second column can be visible, but no third column yet.
  const [activeTreatmentId, setActiveTreatmentId] = useState(null);

  // Clicking a level keeps that level open even after the pointer moves.
  const [lockedConditionId, setLockedConditionId] = useState(null);
  const [lockedTreatmentId, setLockedTreatmentId] = useState(null);

  const activeConditionIdToUse =
    activeConditionId || lockedConditionId;

  const activeCondition =
    eyeConditionData.find(
      (condition) => condition.id === activeConditionIdToUse
    ) || null;

  const activeTreatmentIdToUse =
    activeTreatmentId || lockedTreatmentId;

  const activeTreatment =
    activeCondition?.treatments?.find(
      (treatment) => treatment.id === activeTreatmentIdToUse
    ) || null;

  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setIsOpen(false);

    // Reset on close so it opens cleanly from level one next time.
    setActiveConditionId(null);
    setActiveTreatmentId(null);
    setLockedConditionId(null);
    setLockedTreatmentId(null);
  };

  const handleConditionHover = (condition) => {
    setActiveConditionId(condition.id);

    // Hovering a new condition starts that condition from level two.
    setActiveTreatmentId(null);

    if (lockedConditionId !== condition.id) {
      setLockedTreatmentId(null);
    }
  };

  const handleConditionClick = (condition) => {
    setActiveConditionId(condition.id);
    setLockedConditionId(condition.id);

    // A click opens the second level and keeps it open.
    setActiveTreatmentId(null);
    setLockedTreatmentId(null);
  };

  const handleTreatmentHover = (treatment) => {
    setActiveTreatmentId(treatment.id);
  };

  const goToSection = (href) => {
    if (!href) return;

    const id = href.replace("#", "");

    setIsOpen(false);
    setActiveConditionId(null);
    setActiveTreatmentId(null);
    setLockedConditionId(null);
    setLockedTreatmentId(null);

    window.setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.location.hash = id;
      }
    }, 50);
  };

  const handleTreatmentClick = (treatment) => {
    if (treatment.conditions?.length > 0) {
      // Click locks the third level open.
      setActiveTreatmentId(treatment.id);
      setLockedTreatmentId(treatment.id);
      return;
    }

    goToSection(treatment.href);
  };

  const handleSpecificConditionClick = (condition) => {
    goToSection(condition.href);
  };

  const showSecondColumn = Boolean(activeCondition);
  const showThirdColumn = Boolean(activeTreatment);

  return (
    <div
      className="eye-condition-nav-item"
      onMouseEnter={handleMenuOpen}
      onMouseLeave={handleMenuClose}
    >
      <button
        type="button"
        className={`eye-condition-nav-button ${
          isOpen ? "eye-condition-nav-button-active" : ""
        }`}
        onClick={() => {
          if (isOpen) {
            handleMenuClose();
          } else {
            handleMenuOpen();
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Eye Conditions We Treat</span>

        <ChevronDown
          size={17}
          strokeWidth={2}
          className={`eye-condition-nav-chevron ${
            isOpen ? "eye-condition-nav-chevron-open" : ""
          }`}
        />
      </button>

      <div
        className={`eye-condition-mega-menu ${
          isOpen ? "eye-condition-mega-menu-open" : ""
        } ${
          showThirdColumn
            ? "eye-condition-mega-menu-level-3"
            : showSecondColumn
              ? "eye-condition-mega-menu-level-2"
              : "eye-condition-mega-menu-level-1"
        }`}
      >
        <div className="eye-condition-menu-inner">
          {/* =================================================
              LEVEL 1 — CONDITIONS
          ================================================= */}
          <div className="eye-condition-menu-card eye-condition-level-card">
            <div className="eye-condition-menu-heading">
              CONDITIONS
            </div>
            <div className="eye-condition-menu-helper">Hover to explore</div>

            <div className="eye-condition-items">
              {eyeConditionData.map((condition) => (
                <button
                  key={condition.id}
                  type="button"
                  className={`eye-condition-item ${
                    activeCondition?.id === condition.id
                      ? "active"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    handleConditionHover(condition)
                  }
                  onClick={() =>
                    handleConditionClick(condition)
                  }
                >
                  <span>{condition.title}</span>

                  <ChevronRight
                    size={15}
                    strokeWidth={2}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              LEVEL 2 — TREATMENTS
              Appears only after hovering/clicking a condition.
          ================================================= */}
          {showSecondColumn && (
            <div className="eye-condition-menu-card eye-condition-level-card eye-condition-enter">
              <div className="eye-condition-menu-heading">
                {activeCondition.title.toUpperCase()}
              </div>
              <div className="eye-condition-menu-helper">Select a treatment to explore</div>

              <div className="eye-condition-items">
                {activeCondition.treatments.map(
                  (treatment) => (
                    <button
                      key={treatment.id}
                      type="button"
                      className={`eye-condition-item ${
                        activeTreatment?.id === treatment.id
                          ? "active"
                          : ""
                      }`}
                      onMouseEnter={() =>
                        handleTreatmentHover(treatment)
                      }
                      onClick={() =>
                        handleTreatmentClick(treatment)
                      }
                    >
                      <span>{treatment.title}</span>

                      <ChevronRight
                        size={15}
                        strokeWidth={2}
                      />
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* =================================================
              LEVEL 3 — SPECIFIC CONDITIONS
              Appears only after hovering/clicking treatment.
          ================================================= */}
          {showThirdColumn && (
            <div className="eye-condition-menu-card eye-condition-level-card eye-condition-enter">
              <div className="eye-condition-menu-heading">
                {activeTreatment.title.toUpperCase()}
              </div>

              {activeTreatment.conditions?.length > 0 ? (
                <div className="eye-condition-items">
                  {activeTreatment.conditions.map(
                    (condition) => (
                      <button
                        key={condition.id}
                        type="button"
                        className="eye-condition-specific-item"
                        onClick={() =>
                          handleSpecificConditionClick(
                            condition
                          )
                        }
                      >
                        <span>{condition.title}</span>

                        <ChevronRight
                          size={15}
                          strokeWidth={2}
                        />
                      </button>
                    )
                  )}
                </div>
              ) : (
                <div className="eye-condition-treatment-info">
                  <p>
                    {activeTreatment.description}
                  </p>

                  <button
                    type="button"
                    className="eye-condition-learn-more"
                    onClick={() =>
                      handleTreatmentClick(
                        activeTreatment
                      )
                    }
                  >
                    Learn More
                    <ChevronRight
                      size={14}
                      strokeWidth={2}
                    />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   QUICK ACTION COMPONENT
========================================================= */

function QuickAction({
  icon,
  title,
}) {

  return (

    <button className="quick-action">

      <span className="quick-icon">
        {icon}
      </span>

      <span className="quick-title">
        {title}
      </span>

      <Plus
        size={18}
        className="quick-plus"
      />

    </button>

  );
}



/* =========================================================
   STAT COMPONENT
========================================================= */

function Stat({
  number,
  text,
}) {

  return (

    <div className="stat-item">

      <div className="stat-number">
        {number}
      </div>

      <div className="stat-text">
        {text}
      </div>

    </div>

  );
}


export default App;