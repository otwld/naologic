import { API } from '@editorjs/editorjs';

export type ConstructorArgs = {
  api: API;
};

export class MentionTool {
  private button: HTMLButtonElement | null;
  private _state: boolean;
  private readonly api: API;
  private readonly tag: string;
  private readonly inlineToolButtonClasses: Record<'base' | 'active', string>;

  static get CSS() {
    return 'cdx-mention';
  }

  static get isInline() {
    return true;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;

    this.button?.classList.toggle(
      this.api.styles.inlineToolButtonActive,
      state
    );
  }

  constructor({ api }: ConstructorArgs) {
    console.info('[MentionTool] initialized');
    this.api = api;

    this.tag = 'SPAN';

    /**
     * CSS classes
     */
    this.inlineToolButtonClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };

    this.button = null;
    this._state = false;
  }

  placeCaretAfterNode(node: Node) {
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection) {
      range.setStartAfter(node);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = '@';
    this.button.classList.add(this.api.styles.inlineToolButton);

    return this.button;
  }

  surround(range: Range) {
    if (!range) {
      return;
    }

    const termWrapper = this.api.selection.findParentTag(
      this.tag,
      MentionTool.CSS
    );

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range: Range) {
    /**
     * Create a wrapper for highlighting
     */
    const marker = document.createElement(this.tag);

    marker.classList.add(MentionTool.CSS);

    const extractedContent = range.extractContents();

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(span);
     */
    marker.appendChild(extractedContent);
    range.insertNode(marker);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(marker);
  }

  unwrap(termWrapper: HTMLElement) {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.getRangeAt(0);

    const unwrappedContent = range.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode?.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }

  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag);

    console.info(termTag);

    if (!this.button) return;

    this.button.classList.toggle(
      this.inlineToolButtonClasses.active,
      !!termTag
    );
  }

  /**
   * Sanitizer rule
   * @return {{mark: {class: string}}}
   */
  static get sanitize() {
    return {
      span: {
        class: MentionTool.CSS,
      },
    };
  }
}
