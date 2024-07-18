import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { EditorService } from './editor.service';

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

@Injectable()
export class MentionService {
  private readonly editorService = inject(EditorService);
  public readonly config = signal<MentionConfig | null>(null);
  public readonly lastBlockAndKeyPress = computed(
    () => {
      const event = this.editorService.keyPress();
      const block = this.editorService.block();
      return { event, block };
    },
    {
      equal: (a, b) => {
        // Only recompute when block is defined and the key changes.
        return a.event?.key === b.event?.key && !!b.block;
      },
    }
  );

  constructor() {
    effect(() => {
      const config = this.config();
      const { event, block } = this.lastBlockAndKeyPress();
      if (event && config?.keyword?.triggerKeys.includes(event.key)) {
        console.info('[MentionService] Keyword mention detected:', block);
        /**
         * TODO: Show dropdown with keyword suggestions.
         * After selecting a keyword, replace the keyword with the selected suggestion in the editor.
         */
      }
      if (event && config?.user?.triggerKeys.includes(event.key)) {
        console.info('[MentionService] User mention detected:', block);
        /**
         * TODO: Show dropdown with user suggestions.
         * After selecting a user, replace the user mention with the selected user in the editor.
         */
      }
    });
  }

  init(config: MentionConfig) {
    this.config.set(config);
  }
}
