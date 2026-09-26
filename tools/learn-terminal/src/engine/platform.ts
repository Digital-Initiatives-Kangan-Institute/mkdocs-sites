export const IS_MAC = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
export const MOD_KEY = IS_MAC ? '⌘' : '^';

/** True when the platform's nano modifier (Cmd on macOS, Ctrl elsewhere) is held. */
export function nanoModKey(e: { metaKey: boolean; ctrlKey: boolean }): boolean {
  return IS_MAC ? e.metaKey : e.ctrlKey;
}
