export default defineAppConfig({
  ui: {
    colors: {
      primary: "stone",
      neutral: "stone",
      "al-good": "al-good",
      "al-neutral": "al-neutral",
      "al-evil": "al-evil",
      block: "block",
    },
    modal: {
      slots: {
        footer: "flex justify-end items-center gap-1.5 p-4 sm:px-6",
      },
    },
    // button: {
    //   slots: {
    //     label: "truncate uppercase font-normal tracking-wider text-sm",
    //   },
    // },
  },
});
