import type { Image, Character } from "@/types";

export function getTemporaryImage(character: Character) {
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
  switch (imageName?.toLowerCase()) {
    case "barbarian":
      image = {
        url: "barbarian",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "bard":
      image = {
        url: "bard",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "barracks":
      image = {
        url: "barracks",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "church":
      image = {
        url: "church",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "cleric":
      image = {
        url: "cleric",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "druid":
      image = {
        url: "druid",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "fighter":
      image = {
        url: "fighter",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "forge":
      image = {
        url: "forge",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "hospital":
      image = {
        url: "hospital",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "inn":
      image = {
        url: "inn",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "kitchen":
      image = {
        url: "kitchen",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "laboratory":
      image = {
        url: "laboratory",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "monk":
      image = {
        url: "monk",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "office":
      image = {
        url: "office",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "palace":
      image = {
        url: "palace",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "paladin":
      image = {
        url: "paladin",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "ranger":
      image = {
        url: "ranger",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "rogue":
      image = {
        url: "rogue",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "school":
      image = {
        url: "school",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "ship":
      image = {
        url: "ship",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "shop":
      image = {
        url: "shop",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "sorcerer":
      image = {
        url: "sorcerer",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "stable":
      image = {
        url: "stable",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "streets":
      image = {
        url: "streets",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "theatre":
      image = {
        url: "theatre",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "warlock":
      image = {
        url: "warlock",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "wilds":
      image = {
        url: "wilds",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "wizard":
      image = {
        url: "wizard",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    case "workshop":
      image = {
        url: "workshop",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 0,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
        },
      };
      break;
    default:
      image = {
        url: "default",
        artist: "",
        artistUrl: "",
        canvasHeightPx: 300,
        imageHeightPx: 700,
        imagePositionLeftPx: 0,
        imagePositionTopPx: 50,
        mask: "",
        token: {
          topPx: 100,
          leftPx: 700,
          widthPx: 100,
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
