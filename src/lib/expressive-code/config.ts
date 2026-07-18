import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import {
  createRenderer,
  type SatteriExpressiveCodeOptions,
} from "satteri-expressive-code"

export const ecOptions: SatteriExpressiveCodeOptions = {
  themes: ["catppuccin-latte", "catppuccin-mocha"],
  useDarkModeMediaQuery: true,
  themeCssSelector: (theme) =>
    `[data-theme="${theme.name === "catppuccin-mocha" ? "dark" : "light"}"]`,
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  defaultProps: {
    wrap: true,
    showLineNumbers: true,
    collapseStyle: "collapsible-auto",
    overridesByLang: {
      "ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh":
        {
          showLineNumbers: false,
        },
    },
  },
  styleOverrides: {
    codeFontSize: "var(--step--1)",
    codeFontFamily: "var(--font-mono)",
    codeBackground: "var(--surface)",
    borderColor: "var(--border)",
    borderRadius: "var(--radius-xl)",
    uiFontFamily: "var(--font-sans)",
    lineNumbers: {
      foreground: "var(--muted-foreground)",
    },
    frames: {
      editorActiveTabForeground: "var(--accent)",
      editorActiveTabBackground: "var(--surface)",
      editorActiveTabIndicatorBottomColor: "transparent",
      editorActiveTabIndicatorTopColor: "var(--accent)",
      editorTabBorderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
      editorTabBarBackground: "var(--surface-elevated)",
      editorTabBarBorderBottomColor: "var(--border)",
      frameBoxShadowCssValue: "none",
      terminalBackground: "var(--surface)",
      terminalTitlebarBackground: "var(--surface-elevated)",
      terminalTitlebarBorderBottomColor: "var(--border)",
      terminalTitlebarForeground: "var(--muted-foreground)",
    },
    textMarkers: {
      backgroundOpacity: "25%",
      borderOpacity: "25%",
      defaultChroma: "50",
      lineMarkerLabelColor: "var(--foreground)",
    },
    collapsibleSections: {
      closedFontFamily: "var(--font-sans)",
    },
  },
}

export const ecRenderer = createRenderer(ecOptions)
