type ActionFn = (...args: any) => void;

export default class Messager {
  private win: Window;
  private targetOrigin: string;
  private actions: Record<string, ActionFn>;

  constructor(win: Window, targetOrigin: string) {
    this.win = win;
    this.targetOrigin = targetOrigin;
    this.actions = {};
    window.addEventListener('message', this.handleMessageListener, false);
  }

  handleMessageListener = (event: any) => {
    if (event.origin !== this.targetOrigin) {
      console.warn(`layoutframe ${event.origin}不对应源${this.targetOrigin}`);
      return;
    }
    if (!event.data || !event.data.action) {
      return;
    }
    const { action } = event.data;
    if (!this.actions[action]) {
      console.warn(`${action}: layoutFrame missing listener`);
      return;
    }
    this.actions[action](event.data.value);
  };

  on = (action: string, cb: ActionFn) => {
    this.actions[action] = cb;
    return this;
  };

  broadcast = (action: string, value: any) => {
    this.win.postMessage(
      {
        action,
        value,
      },
      '*',
    );
    return this;
  };

  destroy() {
    console.log('messager destroy');
    window.removeEventListener('message', this.handleMessageListener);
  }
}
