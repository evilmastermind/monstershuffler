import type { Image, Character } from "@/types";

export function getTemporaryImage(
  character: Character,
  canvas: Ref<HTMLElement | null>
) {
  const c = character.character;
  // checking if the background, race or class has an image set
  let image;
  const images: Image[] = [];
  if (c?.user?.sheet?.images?.length) {
    return c.user.sheet.images[0];
  } else {
    images.concat(c?.user?.sheet?.images || []);
    images.concat(c?.background?.sheet?.images || []);
    images.concat(c?.race?.sheet?.images || []);
    images.concat(c?.class?.sheet?.images || []);
    images.concat(c?.template?.sheet?.images || []);
    if (images.length > 0) {
      image = images[random(0, images.length - 1)];
      return assignImage(character, image);
    }
  }
  const workplace = c?.background?.workplace;
  const className = c?.class?.name;
  const imageName =
    random(1, 2) === 1 ? workplace || className : className || workplace;
  const randomImage = random(1, 3);
  const tokenLeftPx = (canvas.value?.clientWidth || 100) / 2 - 50;
  switch (imageName?.toLowerCase()) {
    case "barbarian":
      image = {
        url: "/images/backgrounds/barbarian.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 426,
        canvasWidthPx: 1168,
        imageHeightPx: 601.6310679611651,
        imagePositionLeftPx: -97.56521739130437,
        imagePositionTopPx: -175.63106796116506,
        mask: "1",
        token: {
          topPx: 64,
          leftPx: 541,
          widthPx: 363,
        },
      };
      break;
    case "bard":
      image = {
        url: "/images/backgrounds/bard.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 422,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -137,
        mask: "2",
        token: {
          topPx: 95,
          leftPx: 500,
          widthPx: 327,
        },
      };
      break;
    case "barracks":
      image = {
        url: "/images/backgrounds/barracks.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 357,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: -56,
        imagePositionTopPx: -319,
        mask: "1",
        token: {
          topPx: 25,
          leftPx: 279,
          widthPx: 321,
        },
      };
      break;
    case "church":
      image = {
        url: "/images/backgrounds/church.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 474,
        canvasWidthPx: 1168,
        imageHeightPx: 541.6310679611651,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -56.63106796116506,
        mask: "2",
        token: {
          topPx: 27,
          leftPx: 531,
          widthPx: 423,
        },
      };
      break;
    case "cleric":
      image = {
        url: "/images/backgrounds/cleric.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 453,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -148,
        mask: "2",
        token: {
          topPx: 166,
          leftPx: 549,
          widthPx: 85,
        },
      };
      break;
    case "druid":
      image = {
        url: "/images/backgrounds/druid.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 417,
        canvasWidthPx: 1168,
        imageHeightPx: 717,
        imagePositionLeftPx: -86.75,
        imagePositionTopPx: -104,
        mask: "1",
        token: {
          topPx: 30,
          leftPx: 313,
          widthPx: 324,
        },
      };
      break;
    case "fighter":
      image = {
        url: "/images/backgrounds/fighter.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 376,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: -3,
        imagePositionTopPx: -165,
        mask: "2",
        token: {
          topPx: 25,
          leftPx: 345,
          widthPx: 176,
        },
      };
      break;
    case "forge":
      image = {
        url: "/images/backgrounds/forge.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 452,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -98,
        mask: "1",
        token: {
          topPx: 65,
          leftPx: 143,
          widthPx: 241,
        },
      };
      break;
    case "hospital":
      image = {
        url: "/images/backgrounds/hospital.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 478,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -143,
        mask: "2",
        token: {
          topPx: 81,
          leftPx: 581,
          widthPx: 334,
        },
      };
      break;
    case "inn":
      image = {
        url: "/images/backgrounds/inn.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 446,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -144.42857142857144,
        mask: "1",
        token: {
          topPx: 156,
          leftPx: 688,
          widthPx: 179,
        },
      };
      break;
    case "kitchen":
      image = {
        url: "/images/backgrounds/kitchen.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 461,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -48.428571428571445,
        mask: "1",
        token: {
          topPx: 82,
          leftPx: 654,
          widthPx: 319,
        },
      };
      break;
    case "laboratory":
      image = {
        url: "/images/backgrounds/laboratory.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 358,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -104,
        mask: "2",
        token: {
          topPx: 77,
          leftPx: 559,
          widthPx: 282,
        },
      };
      break;
    case "monk":
      image = {
        url: "/images/backgrounds/monk.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 322,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -222,
        mask: "1",
        token: {
          topPx: 0,
          leftPx: 358,
          widthPx: 277,
        },
      };
      break;
    case "office":
      image = {
        url: "/images/backgrounds/office.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 413,
        canvasWidthPx: 1168,
        imageHeightPx: 427.57142857142856,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -2,
        mask: "2",
        token: {
          topPx: 13,
          leftPx: 101,
          widthPx: 388,
        },
      };
      break;
    case "palace":
      image = {
        url: "/images/backgrounds/palace.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 402,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -244,
        mask: "2",
        token: {
          topPx: 0,
          leftPx: 552,
          widthPx: 376,
        },
      };
      break;
    case "paladin":
      image = {
        url: "/images/backgrounds/paladin.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 480,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -90,
        mask: "1",
        token: {
          topPx: 13,
          leftPx: 229,
          widthPx: 444,
        },
      };
      break;
    case "ranger":
      image = {
        url: "/images/backgrounds/ranger.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 473,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -44,
        mask: "2",
        token: {
          topPx: 0,
          leftPx: 530,
          widthPx: 470,
        },
      };
      break;
    case "rogue":
      image = {
        url: "/images/backgrounds/rogue.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 357,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -217,
        mask: "1",
        token: {
          topPx: 85,
          leftPx: 654,
          widthPx: 222,
        },
      };
      break;
    case "school":
      image = {
        url: "/images/backgrounds/school.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 384,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -232,
        mask: "2",
        token: {
          topPx: 84,
          leftPx: 366,
          widthPx: 207,
        },
      };
      break;
    case "ship":
      image = {
        url: "/images/backgrounds/ship.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 385,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: -18,
        imagePositionTopPx: -251,
        mask: "1",
        token: {
          topPx: 0,
          leftPx: 142,
          widthPx: 385,
        },
      };
      break;
    case "shop":
      image = {
        url: "/images/backgrounds/shop.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 414,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -158,
        mask: "1",
        token: {
          topPx: 0,
          leftPx: 473,
          widthPx: 414,
        },
      };
      break;
    case "sorcerer":
      image = {
        url: "/images/backgrounds/sorcerer.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 356,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -2,
        mask: "2",
        token: {
          topPx: 6,
          leftPx: 553,
          widthPx: 296,
        },
      };
      break;
    case "stable":
      image = {
        url: "/images/backgrounds/stable.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 417,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -267,
        mask: "1",
        token: {
          topPx: 79,
          leftPx: 548,
          widthPx: 263,
        },
      };
      break;
    case "streets":
      switch (randomImage) {
        case 1:
          image = {
            url: "/images/backgrounds/streets1.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 471,
            canvasWidthPx: 1168,
            imageHeightPx: 700,
            imagePositionLeftPx: 0,
            imagePositionTopPx: 0,
            mask: "2",
            token: {
              topPx: 53,
              leftPx: 712,
              widthPx: 417,
            },
          };
          break;
        case 2:
          image = {
            url: "/images/backgrounds/streets2.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 466,
            canvasWidthPx: 1168,
            imageHeightPx: 767.4285714285714,
            imagePositionLeftPx: -68.5,
            imagePositionTopPx: -194,
            mask: "2",
            token: {
              topPx: 29,
              leftPx: 422,
              widthPx: 423,
            },
          };
          break;
        default:
          image = {
            url: "/images/backgrounds/streets3.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 430,
            canvasWidthPx: 1168,
            imageHeightPx: 521.6310679611651,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -54.63106796116506,
            mask: "1",
            token: {
              topPx: 0,
              leftPx: 183,
              widthPx: 430,
            },
          };
          break;
      }
      break;
    case "theatre":
      image = {
        url: "/images/backgrounds/theatre.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 402,
        canvasWidthPx: 1168,
        imageHeightPx: 767.4285714285714,
        imagePositionLeftPx: -87.5,
        imagePositionTopPx: -360.42857142857144,
        mask: "2",
        token: {
          topPx: 85,
          leftPx: 401,
          widthPx: 309,
        },
      };
      break;
    case "warlock":
      image = {
        url: "/images/backgrounds/warlock.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 428,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -139,
        mask: "1",
        token: {
          topPx: 121,
          leftPx: 434,
          widthPx: 238,
        },
      };
      break;
    case "wilds":
      switch (randomImage) {
        case 1:
          image = {
            url: "/images/backgrounds/wilds1.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 410,
            canvasWidthPx: 1168,
            imageHeightPx: 582.3956043956044,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -40,
            mask: "2",
            token: {
              topPx: 0,
              leftPx: 499,
              widthPx: 410,
            },
          };
          break;
        case 2:
          image = {
            url: "/images/backgrounds/wilds2.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 340,
            canvasWidthPx: 1168,
            imageHeightPx: 667.4285714285714,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -50,
            mask: "2",
            token: {
              topPx: 0,
              leftPx: 467,
              widthPx: 207,
            },
          };
          break;
        default:
          image = {
            url: "/images/backgrounds/wilds3.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 426,
            canvasWidthPx: 1168,
            imageHeightPx: 430,
            imagePositionLeftPx: -6,
            imagePositionTopPx: 0,
            mask: "1",
            token: {
              topPx: 9,
              leftPx: 178,
              widthPx: 406,
            },
            sheetWidthPx: 800,
          };
          break;
      }
      break;
    case "wizard":
      image = {
        url: "/images/backgrounds/wizard.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 405,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: -432,
        imagePositionTopPx: -187,
        mask: "2",
        token: {
          topPx: 16,
          leftPx: 405,
          widthPx: 350,
        },
        sheetWidthPx: 800,
      };
      break;
    case "workshop":
      switch (randomImage) {
        case 1:
          image = {
            url: "/images/backgrounds/workshop1.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 433,
            canvasWidthPx: 1168,
            imageHeightPx: 433,
            imagePositionLeftPx: 0,
            imagePositionTopPx: 0,
            mask: "1",
            token: {
              topPx: 15,
              leftPx: 168,
              widthPx: 410,
            },
          };
          break;
        case 2:
          image = {
            url: "/images/backgrounds/workshop2.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 401,
            canvasWidthPx: 1168,
            imageHeightPx: 521.6310679611651,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -76.63106796116506,
            mask: "2",
            token: {
              topPx: 10,
              leftPx: 479,
              widthPx: 369,
            },
          };
          break;
        case 3:
          image = {
            url: "/images/backgrounds/workshop3.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 419,
            canvasWidthPx: 1168,
            imageHeightPx: 521.6310679611651,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -95.63106796116506,
            mask: "2",
            token: {
              topPx: 0,
              leftPx: 628,
              widthPx: 393,
            },
          };
          break;
        default:
          image = {
            url: "/images/backgrounds/workshop4.webp",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 419,
            canvasWidthPx: 1168,
            imageHeightPx: 521.6310679611651,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -95.63106796116506,
            mask: "1",
            token: {
              topPx: 0,
              leftPx: 628,
              widthPx: 393,
            },
          };
          break;
      }
      break;
    default:
      image = {
        url: "/images/backgrounds/default.webp",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 472,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -126.42857142857144,
        mask: "1",
        token: {
          topPx: 19,
          leftPx: 356,
          widthPx: 414,
        },
      };
      break;
  }
  return assignImage(character, image);
}

function assignImage(character: Character, image: Image) {
  const c = character.character;
  if (!c?.user) {
    c.user = {};
  }
  if (!c?.user?.sheet) {
    c.user.sheet = {
      images: [image],
    };
  } else {
    c.user.sheet.images = [image];
  }
  return c.user.sheet.images[0];
}
