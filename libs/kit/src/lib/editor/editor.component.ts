import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnInit,
  Signal,
  viewChild,
} from '@angular/core';
import Header from '@editorjs/header';
import { OutputData, ToolConstructable } from '@editorjs/editorjs';
import NestedList from '@editorjs/nested-list';
import MarkerTool from './inline-tools/marker-tool';
import { EditorService } from './editor.service';
import { EditorToolName, MentionUser, MentionVariable } from './editor.types';
import { MentionTool } from './inline-tools/mention-tool';

export type EditorPluginConfig = {
  [key in EditorToolName]: boolean;
};
@Component({
  selector: 'lib-editor',
  standalone: true,
  templateUrl: './editor.component.html',
  providers: [EditorService],
  imports: [],
})
export class EditorComponent implements OnInit {
  private readonly containerElement: Signal<ElementRef<HTMLElement>> =
    viewChild.required('container');
  private readonly editorService = inject(EditorService);

  public readonly placeholder = input.required<string>();
  public readonly data = input<OutputData | null>(null);
  public readonly readOnly = input<boolean>(false);

  public readonly pluginsConfig = input.required<EditorPluginConfig>();

  /**
   * TODO: We can improve this part easily to be more generic,
   * if we receive a map of access keys with the associated data for each
   * we can create a {@link MentionShadowTool} for each one with different data.
   * We'll have to make {@link MentionShadowTool} evolve to work with generic data.
   */
  public readonly users = input<MentionUser[]>([]);
  public readonly variables = input<MentionVariable[]>([]);

  constructor() {
    /**
     * When the data changes, we render the new data in the editor.
     */
    effect(async () => {
      const data = this.data();
      const editor = this.editorService.editor();
      if (data && editor) {
        await editor.render(data);
      }
    });
  }

  ngOnInit() {
    /**
     * Create an editor instance with the following configuration:
     */
    const pluginConfig = this.pluginsConfig();
    this.editorService.createEditor({
      holder: this.containerElement().nativeElement,
      placeholder: this.placeholder(),
      readOnly: this.readOnly(),
      data: this.data() || undefined,
      tools: {
        /**
         * TODO: Improve this part to be more extensible and readable.
         */
        ...(pluginConfig['header']
          ? { header: Header as unknown as ToolConstructable }
          : {}),
        ...(pluginConfig['list'] ? { list: NestedList } : {}),
        ...(pluginConfig['marker'] ? { marker: MarkerTool } : {}),
        ...(pluginConfig['mention'] ? { mention: MentionTool } : {}),
      },
    });
    /**
     * Register mention tools if the plugin is enabled.
     */
    if (pluginConfig.mention) {
      const users = this.users();
      // TODO: Instead of 'à' it should be '@'
      if (users.length) this.editorService.registerMention(users, {
        accessKeys: ['à', '@'],
        mainAccessKey: '@',
        renderer: {
          createTextNode: (data) => `@${data.name}`,
          textNodeClassName: 'mention_tool_user'
        }
      });
      const variables = this.variables();
      if (variables.length) this.editorService.registerMention(
        variables,
        {
          accessKeys: ['$'],
          mainAccessKey: '$',
          renderer: {
            createTextNode: (data) => `{${data.slug}}`,
            textNodeClassName: 'mention_tool_variable'
          }
        }
      )
    }
  }

  save() {
    const editor = this.editorService.editor();
    if (!editor) throw new Error('[EditorComponent] Editor not initialized.');
    return editor.save();
  }
}
