import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBookOpen,
  faCircle,
  faCloud,
  faCog,
  faDiceD20,
  faDiceD6,
  faDragon,
  faMoon,
  faSun,
  faUser,
  faUserEdit,
  faUsers,
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
  faCircle,
  faCloud,
  faCog,
  faDiceD20,
  faDiceD6,
  faDragon,
  faGithub,
  faGithubAlt,
  faMoon,
  faPatreon,
  faRedditAlien,
  faSun,
  faUser,
  faUserEdit,
  faUsers,
  faXmark
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});
