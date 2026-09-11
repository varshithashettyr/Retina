import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { eyeConditionData } from "./eyeConditionData";

import "./EyeCondition.css";


const EyeCondition = () => {

  // =========================================================
  // STATE
  // =========================================================

  const [isOpen, setIsOpen] = useState(false);

  const [activeConditionId, setActiveConditionId] =
    useState(null);

  const [activeTreatmentId, setActiveTreatmentId] =
    useState(null);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });


  // =========================================================
  // REFS
  // =========================================================

  const buttonRef = useRef(null);

  const closeTimerRef = useRef(null);


  // =========================================================
  // ACTIVE CONDITION
  // =========================================================

  const activeCondition =
    eyeConditionData.find(
      (condition) =>
        condition.id === activeConditionId
    ) || null;


  // =========================================================
  // ACTIVE TREATMENT
  // =========================================================

  const activeTreatment =
    activeCondition?.treatments?.find(
      (treatment) =>
        treatment.id === activeTreatmentId
    ) || null;


  // =========================================================
  // GET EXACT NAV BUTTON POSITION
  //
  // The menu starts exactly below the navigation row.
  // =========================================================

  const updateMenuPosition = () => {

    if (!buttonRef.current) {
      return;
    }

    const rect =
      buttonRef.current.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom,
      left: rect.left,
    });
  };


  // =========================================================
  // OPEN MENU
  // =========================================================

  const openMenu = () => {

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    updateMenuPosition();

    setIsOpen(true);
  };


  // =========================================================
  // CLOSE MENU
  // =========================================================

  const closeMenu = () => {

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current =
      window.setTimeout(() => {

        setIsOpen(false);

        setActiveConditionId(null);

        setActiveTreatmentId(null);

      }, 150);
  };


  // =========================================================
  // CANCEL CLOSE
  // =========================================================

  const cancelClose = () => {

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  };


  // =========================================================
  // KEEP MENU POSITION CORRECT
  // =========================================================

  useLayoutEffect(() => {

    if (!isOpen) {
      return;
    }

    updateMenuPosition();


    const handleResize = () => {
      updateMenuPosition();
    };


    const handleScroll = () => {
      updateMenuPosition();
    };


    window.addEventListener(
      "resize",
      handleResize
    );


    window.addEventListener(
      "scroll",
      handleScroll,
      true
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
        true
      );

    };

  }, [isOpen]);


  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {

    return () => {

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

    };

  }, []);


  // =========================================================
  // CONDITION HOVER
  // =========================================================

  const handleConditionHover = (
    condition
  ) => {

    setActiveConditionId(
      condition.id
    );

    setActiveTreatmentId(null);
  };


  // =========================================================
  // CONDITION CLICK
  // =========================================================

  const handleConditionClick = (
    condition
  ) => {

    setActiveConditionId(
      condition.id
    );

    setActiveTreatmentId(null);
  };


  // =========================================================
  // TREATMENT HOVER
  // =========================================================

  const handleTreatmentHover = (
    treatment
  ) => {

    setActiveTreatmentId(
      treatment.id
    );
  };


  // =========================================================
  // GO TO SECTION
  // =========================================================

  const goToSection = (href) => {

    if (!href) {
      return;
    }

    const id =
      href.replace("#", "");


    setIsOpen(false);

    setActiveConditionId(null);

    setActiveTreatmentId(null);


    window.setTimeout(() => {

      const element =
        document.getElementById(id);


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


  // =========================================================
  // TREATMENT CLICK
  // =========================================================

  const handleTreatmentClick = (
    treatment
  ) => {

    if (
      treatment.conditions &&
      treatment.conditions.length > 0
    ) {

      setActiveTreatmentId(
        treatment.id
      );

      return;
    }


    goToSection(
      treatment.href
    );

  };


  // =========================================================
  // SPECIFIC CONDITION CLICK
  // =========================================================

  const handleSpecificConditionClick = (
    condition
  ) => {

    goToSection(
      condition.href
    );

  };


  // =========================================================
  // MENU LEVEL
  // =========================================================

  const showSecondColumn =
    Boolean(activeCondition);

  const showThirdColumn =
    Boolean(activeTreatment);


  let menuLevel = 1;


  if (showThirdColumn) {

    menuLevel = 3;

  } else if (showSecondColumn) {

    menuLevel = 2;

  }


  // =========================================================
  // POSITION VARIABLES
  //
  // IMPORTANT:
  //
  // Level 1:
  //   left = actual button position
  //
  // Level 2 / 3:
  //   CSS centers the complete panel.
  // =========================================================

  const menuStyle = {

    "--eye-condition-menu-top":
      `${menuPosition.top}px`,

    "--eye-condition-menu-left":
      `${menuPosition.left}px`,

  };


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div
      className="eye-condition-nav-item"

      onMouseEnter={openMenu}

      onMouseLeave={closeMenu}
    >


      {/* =====================================================
          NAV BUTTON
      ===================================================== */}

      <button
        ref={buttonRef}

        type="button"

        className={`
          eye-condition-nav-button
          ${
            isOpen
              ? "eye-condition-nav-button-active"
              : ""
          }
        `}

        onClick={() => {

          if (isOpen) {

            closeMenu();

          } else {

            openMenu();

          }

        }}

        aria-expanded={isOpen}

        aria-haspopup="true"
      >

        <span>
          Eye Conditions We Treat
        </span>


        <ChevronDown
          size={17}

          strokeWidth={2}

          className={`
            eye-condition-nav-chevron
            ${
              isOpen
                ? "eye-condition-nav-chevron-open"
                : ""
            }
          `}
        />

      </button>



      {/* =====================================================
          MEGA MENU
      ===================================================== */}

      <div
        style={menuStyle}

        className={`
          eye-condition-mega-menu
          eye-condition-mega-menu-level-${menuLevel}
          ${
            isOpen
              ? "eye-condition-mega-menu-open"
              : ""
          }
        `}

        onMouseEnter={cancelClose}

        onMouseLeave={closeMenu}
      >

        <div className="eye-condition-menu-inner">


          {/* =================================================
              COLUMN 1 — CONDITIONS
          ================================================= */}

          <div className="eye-condition-menu-card">

            <div className="eye-condition-menu-heading">
              CONDITIONS
            </div>


            <div className="eye-condition-menu-helper">
              Hover to explore
            </div>


            <div className="eye-condition-items">

              {eyeConditionData.map(
                (condition) => (

                  <button
                    key={condition.id}

                    type="button"

                    className={`
                      eye-condition-item
                      ${
                        activeConditionId ===
                        condition.id
                          ? "active"
                          : ""
                      }
                    `}

                    onMouseEnter={() =>
                      handleConditionHover(
                        condition
                      )
                    }

                    onClick={() =>
                      handleConditionClick(
                        condition
                      )
                    }
                  >

                    <span>
                      {condition.title}
                    </span>


                    <ChevronRight
                      size={16}
                      strokeWidth={2}
                    />

                  </button>

                )
              )}

            </div>

          </div>



          {/* =================================================
              COLUMN 2 — TREATMENTS
          ================================================= */}

          {showSecondColumn && (

            <div className="eye-condition-menu-card">

              <div className="eye-condition-menu-heading">
                {activeCondition.title.toUpperCase()}
              </div>


              <div className="eye-condition-menu-helper">
                Hover a treatment to explore
              </div>


              <div className="eye-condition-items">

                {activeCondition.treatments?.map(
                  (treatment) => (

                    <button
                      key={treatment.id}

                      type="button"

                      className={`
                        eye-condition-item
                        ${
                          activeTreatmentId ===
                          treatment.id
                            ? "active"
                            : ""
                        }
                      `}

                      onMouseEnter={() =>
                        handleTreatmentHover(
                          treatment
                        )
                      }

                      onClick={() =>
                        handleTreatmentClick(
                          treatment
                        )
                      }
                    >

                      <span>
                        {treatment.title}
                      </span>


                      {treatment.conditions?.length >
                        0 && (

                        <ChevronRight
                          size={16}
                          strokeWidth={2}
                        />

                      )}

                    </button>

                  )
                )}

              </div>

            </div>

          )}



          {/* =================================================
              COLUMN 3 — SPECIFIC CONDITIONS
          ================================================= */}

          {showThirdColumn && (

            <div className="eye-condition-menu-card">

              <div className="eye-condition-menu-heading">
                {activeTreatment.title.toUpperCase()}
              </div>


              {activeTreatment.conditions?.length >
              0 ? (

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

                        <span>
                          {condition.title}
                        </span>


                        <ChevronRight
                          size={16}
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


                  {activeTreatment.href && (

                    <button
                      type="button"

                      className="eye-condition-learn-more"

                      onClick={() =>
                        goToSection(
                          activeTreatment.href
                        )
                      }
                    >

                      Learn More

                      <ChevronRight
                        size={15}
                        strokeWidth={2}
                      />

                    </button>

                  )}

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );
};


export default EyeCondition;