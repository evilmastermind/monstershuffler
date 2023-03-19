import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { 
  faDiceD20,faDiceD6,faDragon,faUserEdit,faUser,
  faUsers,faCog,faSun,faMoon,faCloud,faCircle,faBookOpen 
} from "@fortawesome/free-solid-svg-icons";
import { faRedditAlien,faPatreon,faGithubAlt,faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(
  faDiceD20,faDiceD6,faDragon,faBookOpen,faUserEdit,faUser,faUsers,
  faCog,faSun,faMoon,faCloud,faRedditAlien,faPatreon,faCircle,faGithubAlt,faGithub
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
