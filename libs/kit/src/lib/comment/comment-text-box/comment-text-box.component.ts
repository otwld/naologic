import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EditorComponent,
  EditorPluginConfig,
} from '../../editor/editor.component';
import { OutputData } from '@editorjs/editorjs';
import { MentionUser, MentionVariable } from '../../editor/editor.types';

@Component({
  selector: 'lib-comment-text-box',
  standalone: true,
  imports: [CommonModule, EditorComponent],
  templateUrl: './comment-text-box.component.html',
})
export class CommentTextBoxComponent {
  public readonly editorPluginConfig: EditorPluginConfig = {
    header: true,
    list: true,
    marker: true,
    mention: true,
  };

  public readonly USERS = signal<MentionUser[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=1',
      slug: 'john-doe',
    },
    {
      id: '2',
      name: 'Paul Doe',
      avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=2',
      slug: 'paul-doe',
    },
    {
      id: '3',
      name: 'Alexandra Lender',
      avatar: 'https://api.dicebear.com/9.x/lorelei/svg?seed=3',
      slug: 'alexandra-lender',
    }
  ]);
  public readonly VARIABLES = signal<MentionVariable[]>([
    {
      id: '1234',
      name: 'Current date',
      slug: 'current-date',
    },
    {
      id: '12345',
      name: 'Tomorrow',
      slug: 'tomorrow-date',
    },
    {
      id: '123456',
      name: 'Yesterday',
      slug: 'yesterday-date',
    },
    {
      id: '1234567',
      name: 'Variable 1',
      slug: 'variable1',
    },
    {
      id: '12345678',
      name: 'Current User',
      slug: 'current-user',
    },
    {
      id: '123456789',
      name: 'Current User Email',
      slug: 'current-user-email',
    },
    {
      id: '1234567890',
      name: 'Current User Name',
      slug: 'current-user-name',
    },
    {
      id: '12345678901',
      name: 'Current User Phone',
      slug: 'current-user-phone',
    },
    {
      id: '123456789012',
      name: 'Current User Address',
      slug: 'current-user-address',
    },
    {
      id: '1234567890123',
      name: 'Current User City',
      slug: 'current-user-city',
    },
    {
      id: '12345678901234',
      name: 'Current User Country',
      slug: 'current-user-country',
    },
    {
      id: '123456789012345',
      name: 'Current User Zip',
      slug: 'current-user-zip',
    },
    {
      id: '1234567890123456',
      name: 'Current User State',
      slug: 'current-user-state',
    },
    {
      id: '12345678901234567',
      name: 'Current User Role',
      slug: 'current-user-role',
    },
    {
      id: '123456789012345678',
      name: 'Current User Company',
      slug: 'current-user-company',
    },
    {
      id: '1234567890123456789',
      name: 'Current User Company Name',
      slug: 'current-user-company-name',
    },
    {
      id: '12345678901234567890',
      name: 'Current User Company Address',
      slug: 'current-user-company-address',
    },
    {
      id: '123456789012345678901',
      name: 'Current User Company City',
      slug: 'current-user-company-city',
    },
    {
      id: '1234567890123456789012',
      name: 'Current User Company Country',
      slug: 'current-user-company-country',
    },
  ]);

  public readonly outputData = signal<OutputData | null>(null);

  async sendMessage(outputDataPromise: Promise<OutputData>) {
    const outputData = await outputDataPromise;
    console.info('[CommentTextBoxComponent] sendMessage', outputData);
    this.outputData.set({ ...outputData });
  }
}
