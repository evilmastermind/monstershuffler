import { library } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
import {
  faBookOpen,
  faCaretLeft,
  faCheck,
  faCircle,
  faCircleQuestion,
  faCloud,
  faCog,
  faDiceD20,
  faDiceD6,
  faDragon,
  faEnvelope,
  faFloppyDisk,
  faKey,
  faMoon,
  faPaperPlane,
  faShuffle,
  faSun,
  faTrash,
  faUser,
  faUserEdit,
  faUsers,
  faVolumeHigh,
  faVolumeOff,
  faXmark,
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
  faCheck,
  faCircle,
  faCircleQuestion,
  faCloud,
  faCog,
  faDiceD20,
  faDiceD6,
  faDragon,
  faEnvelope,
  faFloppyDisk,
  faGithub,
  faGithubAlt,
  faKey,
  faMoon,
  faPatreon,
  faPaperPlane,
  faRedditAlien,
  faShuffle,
  faSun,
  faTrash,
  faUser,
  faUserEdit,
  faUsers,
  faVolumeHigh,
  faVolumeOff,
  faXmark
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
  nuxtApp.vueApp.component("font-awesome-layers", FontAwesomeLayers);
});
