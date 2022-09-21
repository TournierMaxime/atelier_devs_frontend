//Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faIdCard,
  faUserShield,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

//Variables
export const home = (
  <FontAwesomeIcon icon={faHouse} className="fontAwesomeIcon" />
);
export const info = (
  <FontAwesomeIcon icon={faNewspaper} className="fontAwesomeIcon" />
);
export const logout = (
  <FontAwesomeIcon icon={faRightFromBracket} className="fontAwesomeIcon" />
);
export const profil = (
  <FontAwesomeIcon icon={faIdCard} className="fontAwesomeIcon" />
);
export const adminPanel = (
  <FontAwesomeIcon icon={faUserShield} className="fontAwesomeIcon" />
);
