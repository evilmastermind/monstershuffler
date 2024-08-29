<template>
  <div class="m-4">
    <div ref="editorRef" class="test p-4" contenteditable>THIS IS CONTENT</div>
    <MSButton class="mt-4" text="Print markdown" @click="printMarkdown" />
    <div>
      {{ markdown }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Prism from "prismjs";
import { CodeNode } from "@lexical/code";
import {
  createEditor,
  ElementNode,
  TextNode,
  $getSelection,
  $getNodeByKey,
  $isTextNode,
  $isRangeSelection,
  $createParagraphNode,
  SELECTION_CHANGE_COMMAND,
  type RangeSelection,
  type LexicalNode,
} from "lexical";
import {
  $generateJSONFromSelectedNodes,
  $generateNodesFromSerializedNodes,
} from "@lexical/clipboard";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
  registerMarkdownShortcuts,
} from "@/plugins-other/lexical-markdown";

if (typeof globalThis.Prism === "undefined") {
  globalThis.Prism = Prism;
}

const config = {
  namespace: "Obsidian.md Wannabe Editor",
  nodes: [HeadingNode, QuoteNode, CodeNode, LinkNode, ListNode, ListItemNode],
  onError: (error: Error) => {
    throw error;
  },
  theme: {
    // Adding styling to Quote node, see styles.css
    quote: "PlaygroundEditorTheme__quote",
  },
};

const editor = createEditor(config);
const editorRef = ref<HTMLElement | null>(null);
const markdown = ref("");

function printMarkdown() {
  editor.update(() => {
    markdown.value = $convertToMarkdownString(TRANSFORMERS);
  });
}

const registeredElements: WeakSet<HTMLElement> = new WeakSet();

// teardown the listener - return this from your useEffect callback if you're using React.

onMounted(() => {
  console.clear();
  if (!editorRef.value || !editor) {
    console.log("Editor root element is not available");
  }
  // editor.update(() => {
  //   const markdown = $convertToMarkdownString(TRANSFORMERS);
  //   $convertFromMarkdownString(markdown, TRANSFORMERS);
  // });

  editor.setRootElement(editorRef.value);
  mergeRegister(registerRichText(editor));
  mergeRegister(registerMarkdownShortcuts(editor, TRANSFORMERS));

  editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    () => {
      editor.update(() => {
        console.log("----------------------");
        const editorState = editor.getEditorState();

        // If editor is still composing (i.e. backticks) we must wait before the user confirms the key
        if (editor.isComposing()) {
          console.log("Still composing");
          return false;
        }

        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          console.log("Not a collapsed range selection");
          return false;
        }

        const anchorKey = selection.anchor.key;
        // const anchorOffset = selection.anchor.offset;

        const node = editorState._nodeMap.get(anchorKey);

        if (
          !$isTextNode(node)
          // || anchorOffset !== 1
        ) {
          console.log("Not a text node");
          return false;
        }

        // Markdown is not available inside code
        if (node.hasFormat("code")) {
          console.log("Code node");
          return false;
        }

        const parentNode = node.getParent();
        if (parentNode === null) {
          console.log("No parent node");
          return false;
        }

        const grandParentNode = parentNode.getParent();

        // const el = $createParagraphNode();
        // const JSON = $generateJSONFromSelectedNodes(editor, selection);
        // const nodes = $generateNodesFromSerializedNodes(JSON.nodes);
        // el.splice(0, 0, nodes);
        console.log(
          `Node: ${node.__text}, ${node.__type}, ${node.__style}, ${node.__format}`
        );
        console.log("==>", $convertToMarkdownString(TRANSFORMERS, node));
        if (parentNode) {
          console.log(
            `Parent node: ${parentNode?.__text}, ${parentNode.__type}, ${parentNode.__style}, ${parentNode.__format}`
          );
          console.log(
            "==>",
            $convertToMarkdownString(TRANSFORMERS, parentNode)
          );
        } else {
          console.log("No parent node");
        }
        if (grandParentNode) {
          console.log(
            `Grand parent node: ${grandParentNode?.__text}, ${grandParentNode?.__type}, ${grandParentNode?.__style}, ${grandParentNode?.__format}`
          );
          console.log(
            "==>",
            $convertToMarkdownString(TRANSFORMERS, grandParentNode)
          );
        } else {
          console.log("No grand parent node");
        }

        return true;
      });

      return true;

      /// /////////////////////////
      /// /////////////////////////
      /// /////////////////////////

      // let node: LexicalNode | null = null;
      // const selection = $getSelection();
      // if (!selection) {
      //   return false;
      // }
      // if ("anchor" in selection) {
      //   // get the node element from the selection
      //   // console.log("selection", selection);
      //   const key = selection.anchor.key;
      //   node = $getNodeByKey(key);
      //   if (!node) {
      //     return false;
      //   }
      //   if ($isTextNode(node)) {
      //     node = node.getParent();
      //   }

      //   console.log(
      //     "md",
      //     $convertToMarkdownString(
      //       TRANSFORMERS,
      //       (node as ElementNode) || undefined
      //     )
      //   );
      // }
      // if (!node) {
      //   return false;
      // }
      // const el = $createParagraphNode();
      // console.log("selection", selection);
      // const somethingIDontUnderstand = $generateJSONFromSelectedNodes(
      //   editor,
      //   selection
      // );
      // console.log("somethingIDontUnderstand", somethingIDontUnderstand);
      // const nodes = $generateNodesFromSerializedNodes(
      //   somethingIDontUnderstand.nodes
      // );
      // console.log("nodes", nodes);
      // el.splice(0, 0, nodes);
      // const output = $convertToMarkdownString(TRANSFORMERS, el);
      // console.log("output", output);
      // return true;
    },
    1
  );

  // const removeMutationListener = editor.registerMutationListener(
  //   TextNode,
  //   (mutations) => {
  //     editor.getEditorState().read(() => {
  //       for (const [key, mutation] of mutations) {
  //         const element: null | HTMLElement = editor.getElementByKey(key);
  //         console.log("Element", element);
  //         if (element) {
  //           element.contentEditable = "true";
  //           element.addEventListener("focus", () => {
  //             console.log("Element focused");
  //           });
  //         }
  //         if (
  //           // Updated might be a move, so that might mean a new DOM element
  //           // is created. In this case, we need to add and event listener too.
  //           // (mutation === "created" || mutation === "updated") &&
  //           element !== null &&
  //           !registeredElements.has(element)
  //         ) {
  //           registeredElements.add(element);
  //           element.addEventListener("focus", () => {
  //             console.log("Element focused");
  //           });
  //         }
  //       }
  //     });
  //   }
  // );
});
</script>
<style scoped lang="scss">
.test {
  background-color: #fff;
}
.test:focus {
  outline: none;
}
</style>
