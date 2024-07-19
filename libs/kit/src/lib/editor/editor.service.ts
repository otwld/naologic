import { Injectable, OnDestroy, signal } from '@angular/core';

import EditorJS from '@editorjs/editorjs';
import { Subscription } from 'rxjs';
import { EditorConfig } from './editor.types';
import MentionShadowTool, {
  MentionData,
  MentionToolConstructor,
} from './classes/mention-shadow-tool';

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

  public readonly config = signal<EditorConfig | null>(null);

  public readonly holder = signal<HTMLElement | null>(null);

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
      onReady: () => {
        this.ready.set(true);
        /**
         * Set the editor signal to the new editor instance.
         */
        this.editor.set(editor);
      },
    });

    this.holder.set(config.holder);
    this.config.set(config);
    /**
     * Return the new editor instance.
     */
    return editor;
  }

  /**
   * TODO: Register inside a map so we can offer more manipulation to the developer.
   * @param data
   * @param config
   */
  registerMention<T extends MentionData>(
    data: T[],
    config: Omit<MentionToolConstructor<T>, 'holder' | 'data'>
  ) {
    const holder = this.holder();
    if (!holder)
      throw new Error(
        '[EditorService] you cannot register a mention tool if holder is not set.'
      );
    return new MentionShadowTool<T>({
      ...config,
      data,
      holder,
    });
  }

  ngOnDestroy() {
    const editor = this.editor();
    if (editor) editor.destroy();
    if (this.keyPressSubscription) this.keyPressSubscription.unsubscribe();
  }
}
