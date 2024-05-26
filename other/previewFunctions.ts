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
        url: "barbarian",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 426,
        canvasWidthPx: 1168,
        imageHeightPx: 601.6310679611651,
        imagePositionLeftPx: -97.56521739130437,
        imagePositionTopPx: -175.63106796116506,
        mask: "",
        token: {
          topPx: 64,
          leftPx: 541,
          widthPx: 363,
        },
      };
      break;
    case "bard":
      image = {
        url: "bard",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 422,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -137,
        mask: "",
        token: {
          topPx: 95,
          leftPx: 500,
          widthPx: 327,
        },
      };
      break;
    case "barracks":
      image = {
        url: "barracks",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 357,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: -56,
        imagePositionTopPx: -319,
        mask: "",
        token: {
          topPx: 25,
          leftPx: 279,
          widthPx: 321,
        },
      };
      break;
    case "church":
      image = {
        url: "church",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 474,
        canvasWidthPx: 1168,
        imageHeightPx: 541.6310679611651,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -56.63106796116506,
        mask: "",
        token: {
          topPx: 27,
          leftPx: 531,
          widthPx: 423,
        },
      };
      break;
    case "cleric":
      image = {
        url: "cleric",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 453,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -148,
        mask: "",
        token: {
          topPx: 166,
          leftPx: 549,
          widthPx: 85,
        },
      };
      break;
    case "druid":
      image = {
        url: "druid",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 417,
        canvasWidthPx: 1168,
        imageHeightPx: 717,
        imagePositionLeftPx: -86.75,
        imagePositionTopPx: -104,
        mask: "",
        token: {
          topPx: 30,
          leftPx: 313,
          widthPx: 324,
        },
      };
      break;
    case "fighter":
      image = {
        url: "fighter",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 376,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: -3,
        imagePositionTopPx: -165,
        mask: "",
        token: {
          topPx: 25,
          leftPx: 345,
          widthPx: 176,
        },
      };
      break;
    case "forge":
      image = {
        url: "forge",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 452,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -98,
        mask: "",
        token: {
          topPx: 65,
          leftPx: 143,
          widthPx: 241,
        },
      };
      break;
    case "hospital":
      image = {
        url: "hospital",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 478,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -143,
        mask: "",
        token: {
          topPx: 81,
          leftPx: 581,
          widthPx: 334,
        },
      };
      break;
    case "inn":
      image = {
        url: "inn",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 446,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -144.42857142857144,
        mask: "",
        token: {
          topPx: 156,
          leftPx: 688,
          widthPx: 179,
        },
      };
      break;
    case "kitchen":
      image = {
        url: "kitchen",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 461,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -48.428571428571445,
        mask: "",
        token: {
          topPx: 82,
          leftPx: 654,
          widthPx: 319,
        },
      };
      break;
    case "laboratory":
      image = {
        url: "laboratory",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 358,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -104,
        mask: "",
        token: {
          topPx: 77,
          leftPx: 559,
          widthPx: 282,
        },
      };
      break;
    case "monk":
      image = {
        url: "monk",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 322,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -222,
        mask: "",
        token: {
          topPx: 0,
          leftPx: 358,
          widthPx: 277,
        },
      };
      break;
    case "office":
      image = {
        url: "office",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 413,
        canvasWidthPx: 1168,
        imageHeightPx: 427.57142857142856,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -2,
        mask: "",
        token: {
          topPx: 13,
          leftPx: 101,
          widthPx: 388,
        },
      };
      break;
    case "palace":
      image = {
        url: "palace",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 402,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -244,
        mask: "",
        token: {
          topPx: 0,
          leftPx: 552,
          widthPx: 376,
        },
      };
      break;
    case "paladin":
      image = {
        url: "paladin",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 480,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -90,
        mask: "",
        token: {
          topPx: 13,
          leftPx: 229,
          widthPx: 444,
        },
      };
      break;
    case "ranger":
      image = {
        url: "ranger",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 473,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -44,
        mask: "",
        token: {
          topPx: 0,
          leftPx: 530,
          widthPx: 470,
        },
      };
      break;
    case "rogue":
      image = {
        url: "rogue",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 357,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -217,
        mask: "",
        token: {
          topPx: 85,
          leftPx: 654,
          widthPx: 222,
        },
      };
      break;
    case "school":
      image = {
        url: "school",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 384,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -232,
        mask: "",
        token: {
          topPx: 84,
          leftPx: 366,
          widthPx: 207,
        },
      };
      break;
    case "ship":
      image = {
        url: "ship",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 385,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: -18,
        imagePositionTopPx: -251,
        mask: "",
        token: {
          topPx: 0,
          leftPx: 142,
          widthPx: 385,
        },
      };
      break;
    case "shop":
      image = {
        url: "shop",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 414,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -158,
        mask: "",
        token: {
          topPx: 0,
          leftPx: 473,
          widthPx: 414,
        },
      };
      break;
    case "sorcerer":
      image = {
        url: "sorcerer",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 356,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -2,
        mask: "",
        token: {
          topPx: 6,
          leftPx: 553,
          widthPx: 296,
        },
      };
      break;
    case "stable":
      image = {
        url: "stable",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 417,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -267,
        mask: "",
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
            url: "streets1",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 471,
            canvasWidthPx: 1168,
            imageHeightPx: 700,
            imagePositionLeftPx: 0,
            imagePositionTopPx: 0,
            mask: "",
            token: {
              topPx: 53,
              leftPx: 712,
              widthPx: 417,
            },
          };
          break;
        case 2:
          image = {
            url: "streets2",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 466,
            canvasWidthPx: 1168,
            imageHeightPx: 767.4285714285714,
            imagePositionLeftPx: -68.5,
            imagePositionTopPx: -194,
            mask: "",
            token: {
              topPx: 29,
              leftPx: 422,
              widthPx: 423,
            },
          };
          break;
        default:
          image = {
            url: "streets3",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 430,
            canvasWidthPx: 1168,
            imageHeightPx: 521.6310679611651,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -54.63106796116506,
            mask: "",
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
        url: "theatre",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 402,
        canvasWidthPx: 1168,
        imageHeightPx: 767.4285714285714,
        imagePositionLeftPx: -87.5,
        imagePositionTopPx: -360.42857142857144,
        mask: "",
        token: {
          topPx: 85,
          leftPx: 401,
          widthPx: 309,
        },
      };
      break;
    case "warlock":
      image = {
        url: "warlock",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 428,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -139,
        mask: "",
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
            url: "wilds1",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 410,
            canvasWidthPx: 1168,
            imageHeightPx: 582.3956043956044,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -40,
            mask: "",
            token: {
              topPx: 0,
              leftPx: 499,
              widthPx: 410,
            },
          };
          break;
        case 2:
          image = {
            url: "wilds2",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 340,
            canvasWidthPx: 1168,
            imageHeightPx: 667.4285714285714,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -50,
            mask: "",
            token: {
              topPx: 0,
              leftPx: 467,
              widthPx: 207,
            },
          };
          break;
        default:
          image = {
            url: "wilds3",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 390,
            canvasWidthPx: 1168,
            imageHeightPx: 747.4285714285714,
            imagePositionLeftPx: -63,
            imagePositionTopPx: -340.42857142857144,
            mask: "",
            token: {
              topPx: 0,
              leftPx: 205,
              widthPx: 219,
            },
          };
          break;
      }
      break;
    case "wizard":
      image = {
        url: "wizard",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 440,
        canvasWidthPx: 1168,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -161,
        mask: "",
        token: {
          topPx: 53,
          leftPx: 769,
          widthPx: 350,
        },
      };
      break;
    case "workshop":
      switch (randomImage) {
        case 1:
          image = {
            url: "workshop1",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 407,
            canvasWidthPx: 1168,
            imageHeightPx: 667.4285714285714,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -194.42857142857144,
            mask: "",
            token: {
              topPx: 0,
              leftPx: 371,
              widthPx: 407,
            },
          };
          break;
        case 2:
          image = {
            url: "workshop2",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 401,
            canvasWidthPx: 1168,
            imageHeightPx: 521.6310679611651,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -76.63106796116506,
            mask: "",
            token: {
              topPx: 10,
              leftPx: 479,
              widthPx: 369,
            },
          };
          break;
        default:
          image = {
            url: "workshop3",
            artist: "",
            artistUrl: "",
            canvasHeightPx: 419,
            canvasWidthPx: 1168,
            imageHeightPx: 521.6310679611651,
            imagePositionLeftPx: 0,
            imagePositionTopPx: -95.63106796116506,
            mask: "",
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
        url: "default",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 472,
        canvasWidthPx: 1168,
        imageHeightPx: 667.4285714285714,
        imagePositionLeftPx: 0,
        imagePositionTopPx: -126.42857142857144,
        mask: "",
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
