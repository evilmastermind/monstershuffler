import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBookOpen,
  faCaretLeft,
  faCheck,
  faCircle,
  faCloud,
  faCog,
  faDiceD20,
  faDiceD6,
  faDragon,
  faEnvelope,
  faKey,
  faMoon,
  faSun,
  faShuffle,
  faUser,
  faUserEdit,
  faUsers,
  faXmark,
  faVolumeOff,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGithubAlt,
  faPatreon,
  faRedditAlien,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faBookOpen,
  faCaretLeft,
  faCircle,
  faCheck,
  faCloud,
  faCog,
  faDiceD20,
  faDiceD6,
  faDragon,
  faGithub,
  faGithubAlt,
  faEnvelope,
  faKey,
  faMoon,
  faPatreon,
  faRedditAlien,
  faSun,
  faUser,
  faShuffle,
  faUserEdit,
  faUsers,
  faXmark,
  faVolumeOff,
  faVolumeHigh
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
