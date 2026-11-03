import { useState, useEffect } from 'react';
import PandaBridge from 'pandasuite-bridge';

/* The theme of the Studio appearance ('light' or 'dark') while the editor is
 * open; undefined until the Studio sends it, and always outside the Studio. */
export default function useStudioTheme() {
  const [theme, setTheme] = useState(
    PandaBridge.appearance && PandaBridge.appearance.theme,
  );
  useEffect(
    () => PandaBridge.onAppearanceChange((appearance) => setTheme(appearance.theme)),
    [],
  );
  return theme;
}
