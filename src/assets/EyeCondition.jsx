import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { eyeConditionData } from "./eyeConditionData";
import "./EyeCondition.css";

const EyeCondition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConditionId, setActiveConditionId] = useState("retina");
  const [activeTreatmentId, setActiveTreatmentId] =
    useState("medical-retina");

  const activeCondition =
    eyeConditionData.find(
      (condition) => condition.id === activeConditionId
    ) || eyeConditionData[0];

  const activeTreatment =
    activeCondition?.treatments?.find(
      (treatment) => treatment.id === activeTreatmentId
    ) || activeCondition?.treatments?.[0];

  const handleConditionHover = (condition) => {
    setActiveConditionId(condition.id);

    if (condition.treatments?.length) {
      setActiveTreatmentId(condition.treatments[0].id);
    } else {
      setActiveTreatmentId(null);
    }
  };

  const handleConditionClick = (condition) => {
    setActiveConditionId(condition.id);

    if (condition.treatments?.length) {
      setActiveTreatmentId(condition.treatments[0].id);
    }
  };

  const goToSection = (href) => {
    if (!href) return;

    const id = href.replace("#", "");
    setIsOpen(false);

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
    if (treatment.conditions?.length) {
      setActiveTreatmentId(treatment.id);
      return;
    }

    goToSection(treatment.href);
  };

  const handleSpecificConditionClick = (condition) => {
    goToSection(condition.href);
  };

  return (
    <div
      className="eye-condition-nav-item"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`eye-condition-nav-button ${
          isOpen ? "eye-condition-nav-button-active" : ""
        }`}
        onClick={() => setIsOpen((previous) => !previous)}
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
        }`}
      >
        <div className="eye-condition-menu-inner">
          <div className="eye-condition-menu-card">
            <div className="eye-condition-menu-heading">CONDITIONS</div>

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

          <div className="eye-condition-menu-card">
            <div className="eye-condition-menu-heading">
              {activeCondition?.title?.toUpperCase() || "TREATMENTS"}
            </div>

            <div className="eye-condition-items">
              {activeCondition?.treatments?.map((treatment) => (
                <button
                  key={treatment.id}
                  type="button"
                  className={`eye-condition-item ${
                    activeTreatmentId === treatment.id ? "active" : ""
                  }`}
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

          <div className="eye-condition-menu-card">
            <div className="eye-condition-menu-heading">
              {activeTreatment?.title?.toUpperCase() || "TREATMENT"}
            </div>

            {activeTreatment?.conditions?.length > 0 ? (
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
                <p>{activeTreatment?.description}</p>

                {activeTreatment?.href && (
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
        </div>
      </div>
    </div>
  );
};

export default EyeCondition;
