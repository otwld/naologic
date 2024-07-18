import {
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  Signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorService } from '../../editor/editor.service';
import Header from '@editorjs/header';
import NestedList from '@editorjs/nested-list';
import { ToolConstructable } from '@editorjs/editorjs';
import { MentionService } from '../../editor/mention.service';
import { MentionTool } from '../../editor/inline-tools/mention-tool';

@Component({
  selector: 'lib-comment-text-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-text-box.component.html',
  providers: [EditorService, MentionService],
})
export class CommentTextBoxComponent implements OnInit {
  private readonly containerElement: Signal<ElementRef<HTMLElement>> =
    viewChild.required('container');
  private readonly editorService = inject(EditorService);
  private readonly mentionService = inject(MentionService);

  ngOnInit() {
    /**
     * Create an editor instance with the following configuration:
     */
    this.editorService.createEditor({
      holder: this.containerElement().nativeElement,
      placeholder: 'Write a comment...',
      tools: {
        header: {
          class: Header as unknown as ToolConstructable,
        },
        list: NestedList,
        mention: {
          class: MentionTool as unknown as ToolConstructable,
          config: {
            holder: this.containerElement().nativeElement,
            mentionConfig: {
              keyword: {
                triggerKeys: ['#', 'p'],
              },
              user: {
                triggerKeys: ['@'],
              },
            }
          }
        }

      },
    });
    /**
     * Initialize the mention service with the following configuration:
     *
     * TODO: Conditional initialization based the component's input
     */
    // this.mentionService.init({
    //   keyword: {
    //     triggerKeys: ['#'],
    //   },
    //   user: {
    //     triggerKeys: ['@'],
    //   },
    // });
  }
}
