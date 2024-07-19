import { EditorConfig as _EditorConfig } from '@editorjs/editorjs';
import {
  ToolConstructable,
  ToolSettings,
} from '@editorjs/editorjs/types/tools';

export type EditorConfig = {
  tools: {
    header?: ToolConstructable | ToolSettings;
    list?: ToolConstructable | ToolSettings;
    marker?: ToolConstructable | ToolSettings;
  };
} & Omit<_EditorConfig, 'tools'>;

export type EditorToolName = keyof EditorConfig['tools'] | 'mention';

export type MentionVariable = {
  id: string;
  name: string;
  slug: string;
}

export type MentionUser = {
  id: string;
  name: string;
  avatar: string;
  slug: string;
};
