import colors from "tailwindcss/colors";
import { type ThemeDefinition, createVuetify } from "vuetify";
import { md2 } from "vuetify/blueprints";
import { VBtn } from "vuetify/components";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const twTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: colors.slate["900"],
    surface: colors.slate["800"],
    primary: colors.sky["500"],
    secondary: colors.teal["500"],
    error: colors.rose["500"],
    info: colors.violet["500"],
    success: colors.emerald["500"],
    warning: colors.amber["500"],
    danger: colors.rose["500"],
  },
};

const vuetify = createVuetify({
  blueprint: md2,
  theme: {
    defaultTheme: "twTheme",
    themes: {
      twTheme,
    },
  },
  aliases: {
    VBtnBase: VBtn,
  },
  defaults: {
    VBtn: {
      variant: "flat",
    },
    VBtnBase: {
      variant: "text",
    },
    VSheet: {
      elevation: 1,
    },
    VDialog: {
      attach: "#app",
      persistent: true,
      // noClickAnimation: false,
      maxWidth: "720px",
    },
    VOverlay: {
      attach: "#app",
      zIndex: 100,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

export default vuetify;
