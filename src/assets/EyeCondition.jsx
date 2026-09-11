import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { eyeConditionData } from "./eyeConditionData";
import "./EyeCondition.css";

const EyeCondition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConditionId, setActiveConditionId] = useState(null);
  const [activeTreatmentId, setActiveTreatmentId] = useState(null);

  const activeCondition = eyeConditionData.find(
    (condition) => condition.id === activeConditionId
  );

  const activeTreatment = activeCondition?.treatments?.find(
    (treatment) => treatment.id === activeTreatmentId
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveConditionId(null);
    setActiveTreatmentId(null);
  };

  const handleConditionHover = (condition) => {
    setActiveConditionId(condition.id);
    setActiveTreatmentId(null);
  };

  const handleConditionClick = (condition) => {
    setActiveConditionId(condition.id);
    setActiveTreatmentId(null);
  };

  const handleTreatmentHover = (treatment) => {
    setActiveTreatmentId(treatment.id);
  };

  const handleTreatmentClick = (treatment) => {
    if (treatment.conditions?.length) {
      setActiveTreatmentId(treatment.id);
      return;
    }

    goToSection(treatment.href);
  };

  const goToSection = (href) => {
    if (!href) return;

    const id = href.replace("#", "");
    setIsOpen(false);
    setActiveConditionId(null);
    setActiveTreatmentId(null);

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

  const handleSpecificConditionClick = (condition) => {
    goToSection(condition.href);
  };

  const showSecondColumn = Boolean(activeCondition);
  const showThirdColumn = Boolean(activeTreatment);

  let menuLevel = 1;

  if (showThirdColumn) {
    menuLevel = 3;
  } else if (showSecondColumn) {
    menuLevel = 2;
  }

  return (
    <div
      className="eye-condition-nav-item"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <button
        type="button"
        className={`eye-condition-nav-button ${
          isOpen ? "eye-condition-nav-button-active" : ""
        }`}
        onClick={() => {
          if (isOpen) {
            handleClose();
          } else {
            handleOpen();
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
        className={`eye-condition-mega-menu eye-condition-mega-menu-level-${menuLevel} ${
          isOpen ? "eye-condition-mega-menu-open" : ""
        }`}
      >
        <div className="eye-condition-menu-inner">
          {/* LEVEL 1 — CONDITIONS */}
          <div className="eye-condition-menu-card eye-condition-enter">
            <div className="eye-condition-menu-heading">CONDITIONS</div>
            <div className="eye-condition-menu-helper">
              Hover to explore
            </div>

            <div className="eye-condition-items">
              {eyeConditionData.map((condition) => (
                <button
                  key={condition.id}
                  type="button"
                  className={`eye-condition-item ${
                    activeConditionId === condition.id ? "active" : ""
                  }`}
                  onMouseEnter={() => handleConditionHover(condition)}
                  onClick={() => handleConditionClick(condition)}
                >
                  <span>{condition.title}</span>
                  <ChevronRight size={16} strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>

          {/* LEVEL 2 — TREATMENTS */}
          {showSecondColumn && (
            <div className="eye-condition-menu-card eye-condition-enter">
              <div className="eye-condition-menu-heading">
                {activeCondition.title.toUpperCase()}
              </div>

              <div className="eye-condition-menu-helper">
                Hover a treatment to explore
              </div>

              <div className="eye-condition-items">
                {activeCondition.treatments?.map((treatment) => (
                  <button
                    key={treatment.id}
                    type="button"
                    className={`eye-condition-item ${
                      activeTreatmentId === treatment.id ? "active" : ""
                    }`}
                    onMouseEnter={() => handleTreatmentHover(treatment)}
                    onClick={() => handleTreatmentClick(treatment)}
                  >
                    <span>{treatment.title}</span>

                    {treatment.conditions?.length > 0 && (
                      <ChevronRight size={16} strokeWidth={2} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 3 — SPECIFIC CONDITIONS */}
          {showThirdColumn && (
            <div className="eye-condition-menu-card eye-condition-enter">
              <div className="eye-condition-menu-heading">
                {activeTreatment.title.toUpperCase()}
              </div>

              {activeTreatment.conditions?.length > 0 ? (
                <div className="eye-condition-items">
                  {activeTreatment.conditions.map((condition) => (
                    <button
                      key={condition.id}
                      type="button"
                      className="eye-condition-specific-item"
                      onClick={() => handleSpecificConditionClick(condition)}
                    >
                      <span>{condition.title}</span>
                      <ChevronRight size={16} strokeWidth={2} />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="eye-condition-treatment-info">
                  <p>{activeTreatment.description}</p>

                  {activeTreatment.href && (
                    <button
                      type="button"
                      className="eye-condition-learn-more"
                      onClick={() => handleTreatmentClick(activeTreatment)}
                    >
                      Learn More
                      <ChevronRight size={15} strokeWidth={2} />
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
