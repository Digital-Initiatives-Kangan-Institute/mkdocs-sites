/* engine/dialog.ts — promise-based confirm dialog shared by login and terminal */

import { Store } from './store.ts';

export interface DialogState {
  title: string;
  msg: string;
  confirmText: string;
  confirmClass?: string;
}

class DialogStore extends Store<DialogState | null> {
  private resolve: ((ok: boolean) => void) | null = null;

  show(title: string, msg: string, confirmText?: string, confirmClass?: string): Promise<boolean> {
    this.resolve?.(false);
    return new Promise(resolve => {
      this.resolve = resolve;
      this.set({ title, msg, confirmText: confirmText || 'Confirm', confirmClass });
    });
  }

  close(ok: boolean) {
    const resolve = this.resolve;
    this.resolve = null;
    this.set(null);
    resolve?.(ok);
  }
}

export const dialog = new DialogStore(null);
export const showDialog = dialog.show.bind(dialog);
