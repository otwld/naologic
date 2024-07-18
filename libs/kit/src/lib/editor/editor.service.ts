import { computed, Injectable, OnDestroy, signal } from '@angular/core';

import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { fromEvent, Subscription } from 'rxjs';

type OnChangeParameters = Parameters<
  Exclude<EditorConfig['onChange'], undefined>
>;

@Injectable()
export class EditorService implements OnDestroy {
  /**
   * Subscription to the keypress event on the editor holder.
   * @private
   */
  private keyPressSubscription: Subscription | null = null;
  /**
   * Signal that emits the current editor instance.
   */
  public readonly editor = signal<EditorJS | null>(null);
  /**
   * Signal that emits when the editor content changes.
   */
  public readonly change = signal<OnChangeParameters | null>(null);
  /**
   * Signal that emits when the editor is ready.
   */
  public readonly ready = signal<boolean>(false);

  /**
   * Computed signal that emits the block from the last change event.
   */
  public readonly block = computed(() => {
    const change = this.change();
    if (!change) return null;
    const [, event] = change;
    // TODO: Handle correctly when event is an array
    const block = Array.isArray(event) ? event[0] : event;
    return block.detail.target;
  });

  /**
   * Signal that emits when a keypress event occurs on the editor holder.
   */
  public readonly keyPress = signal<KeyboardEvent | null>(null);

  /**
   * Create a new editor instance with the given configuration.
   * Then set the editor signal to the new editor instance.
   * If an editor already exists, an error will be thrown.
   * @param config The configuration for the editor.
   */
  createEditor(config: Omit<EditorConfig, 'onChange' | 'onReady'>) {
    if (!config.holder) throw new Error('[EditorService] holder is required.');
    if (typeof config.holder === 'string')
      throw new Error('[EditorService] holder must be an HTMLElement.');
    if (this.editor())
      throw new Error(
        '[EditorService] Editor already created, you can only have one editor at a time.'
      );

    /**
     * Create a new editor instance with the given configuration.
     */
    const editor = new EditorJS({
      ...config,
      onChange: (api, event) => this.change.set([api, event]),
      onReady: () => this.ready.set(true),
    });

    /**
     * Listen for keypress events on the editor holder.
     */
    this.keyPressSubscription = fromEvent(config.holder, 'keypress').subscribe(
      (e) => {
        this.keyPress.set(e as KeyboardEvent);
      }
    );

    /**
     * Set the editor signal to the new editor instance.
     */
    this.editor.set(editor);

    /**
     * Return the new editor instance.
     */
    return editor;
  }

  ngOnDestroy() {
    const editor = this.editor();
    console.info(editor);
    if (editor) editor.destroy();
    if (this.keyPressSubscription) this.keyPressSubscription.unsubscribe();
  }
}
