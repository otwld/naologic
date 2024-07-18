import { API } from '@editorjs/editorjs';

type ConstructorArgs = {
  api: API;
  config: {
    holder: HTMLElement;
    mentionConfig: MentionConfig;
  }
}

type MentionConfig = {
  /**
   * Configuration for the keyword mention (i.e. #hashtag).
   */
  keyword?: {
    triggerKeys: string[];
  };
  /**
   * Configuration for the user mention (i.e. @username).
   */
  user?: {
    triggerKeys: string[];
  };
};

function isKeyboardEvent(event: any): event is KeyboardEvent {
  return event instanceof KeyboardEvent;
}

export class MentionTool {
  private button: HTMLButtonElement | null;
  private _state: boolean;
  private readonly api: API;
  private readonly holder: HTMLElement;
  private readonly tag: string;
  private readonly class: string;
  private readonly mentionConfig: MentionConfig;

  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;

    this.button?.classList.toggle(this.api.styles.inlineToolButtonActive, state);
  }

  constructor({api, config}: ConstructorArgs) {
    console.info('[MarkerTool] initialized');
    this.api = api;
    this.holder = config.holder;
    this.mentionConfig = config.mentionConfig;

    /**
     * Listen for keypress events on the editor holder.
     */
    this.api.listeners.on(this.holder, 'keypress', (event) => {
      if (!isKeyboardEvent(event)) return;
      const lastBlock = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());
      // lastBlock.holder.appendChild()

      if (event && this.mentionConfig?.keyword?.triggerKeys.includes(event.key)) {
        console.info('[MarkerTool] Keyword mention detected:', lastBlock);
        /**
         * TODO: Show dropdown with keyword suggestions.
         * After selecting a keyword, replace the keyword with the selected suggestion in the editor.
         */
        this.api.toolbar.toggleToolbox(true);
      }
      if (event && this.mentionConfig?.user?.triggerKeys.includes(event.key)) {
        console.info('[MarkerTool] User mention detected:', lastBlock);
        /**
         * TODO: Show dropdown with user suggestions.
         * After selecting a user, replace the user mention with the selected user in the editor.
         */
        this.api.toolbar.toggleToolbox(true);
        // this.api.inlineToolbar.open();
      }
    });
    this.button = null;
    this._state = false;

    this.tag = 'MARK';
    this.class = 'cdx-marker';
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = '<svg width="20" height="18"><path d="M10.458 12.04l2.919 1.686-.781 1.417-.984-.03-.974 1.687H8.674l1.49-2.583-.508-.775.802-1.401zm.546-.952l3.624-6.327a1.597 1.597 0 0 1 2.182-.59 1.632 1.632 0 0 1 .615 2.201l-3.519 6.391-2.902-1.675zm-7.73 3.467h3.465a1.123 1.123 0 1 1 0 2.247H3.273a1.123 1.123 0 1 1 0-2.247z"/></svg>';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range: any) {
    if (this.state) {
      this.unwrap(range);
      return;
    }

    this.wrap(range);
  }

  wrap(range: any) {
    const selectedText = range.extractContents();
    const mark = document.createElement(this.tag);

    mark.classList.add(this.class);
    mark.appendChild(selectedText);
    range.insertNode(mark);

    this.api.selection.expandToTag(mark);
  }

  unwrap(range: any) {
    const mark = this.api.selection.findParentTag(this.tag, this.class);
    const text = range.extractContents();

    mark?.remove();

    range.insertNode(text);
  }


  checkState() {
    const mark = this.api.selection.findParentTag(this.tag);

    this.state = !!mark;
  }

  /**
   * This code is from a gist, we will base our implementation on this.
   */

  // getMentions(q) {
  //   mentionsService.getMentions(q).then((users) => {
  //     this.nodes.userList.innerHTML = '';
  //
  //     users.forEach((user, i) => {
  //       const li = document.createElement('li');
  //       li.innerHTML = mentionsService.outputTemplate(user);
  //       if (i === 0) { li.classList.add(this.CSS.liActive); }
  //       li.addEventListener('click', (e) => {
  //         e.preventDefault();
  //
  //         const a = this.nodes.anchor
  //         a.innerHTML = '@' + user.name;
  //         a.href = '#' + user.id;
  //
  //         // adds a space after the mention
  //         a.insertAdjacentHTML('afterend', '&nbsp;');
  //         // focus after the space
  //         this.setCursor(a.nextSibling, 1)
  //       });
  //       this.nodes.userList.appendChild(li);
  //     });
  //   });
  // }
  //
  // enterPressed(event) {
  //   event.preventDefault();
  //   const firstLi = this.nodes.userList.querySelector(`li.${this.CSS.liActive}`);
  //   if (!firstLi) { return; }
  //
  //   firstLi.click();
  // }
  //
  // downOrUpPressed(event) {
  //   event.preventDefault();
  //   const currentLi = this.nodes.userList.querySelector(`li.${this.CSS.liActive}`);
  //   const nextLi = event.keyCode === 40 ? currentLi?.nextSibling : currentLi?.previousSibling;
  //   if (nextLi) {
  //     currentLi.classList.remove(this.CSS.liActive);
  //     nextLi.classList.add(this.CSS.liActive);
  //   }
  // }
  //
  // showActions(a) {
  //   if (this.nodes.userList) { return; }
  //
  //   // remove input from original link inline tool
  //   document.querySelector(`.${this.CSS.inputShowed}`).remove();
  //
  //   if (a.href) { return; }
  //
  //   this.nodes.anchor = a; // save anchor for later
  //
  //   this.nodes.input.classList.add(`${this.CSS.inputShowed}`);
  //   setTimeout(() => { this.nodes.input.focus(); }); // wait for input to be visible
  //
  //   this.nodes.userList = document.createElement('ul');
  //   this.nodes.userList.classList.add(this.CSS.ul);
  //   this.wrapper.appendChild(this.nodes.userList);
  //   this.getMentions();
  // }
  //
  // hideActions() {
  //   this.nodes.input.classList.remove(this.CSS.inputShowed);
  //   this.nodes.input.value = '';
  //   this.nodes.anchor = null;
  //   if (this.nodes.userList) {
  //     this.nodes.userList.remove();
  //     this.nodes.userList = null;
  //   }
  // }
  //
  // clear() {
  //   this.hideActions();
  // }
  //
  // setCursor(element, offset) {
  //   const range = document.createRange();
  //   const selection = window.getSelection();
  //
  //   range.setStart(element, offset);
  //   range.setEnd(element, offset);
  //
  //   selection.removeAllRanges();
  //   selection.addRange(range);
  //
  //   return range.getBoundingClientRect();
  // }
}
