import { Meta, StoryObj } from '@storybook/angular';
import { CommentTextBoxComponent } from './comment-text-box.component';

const meta: Meta<CommentTextBoxComponent> = {
  component: CommentTextBoxComponent,
  title: 'Comment/Text Box',
  args: {},
};
export default meta;
type Story = StoryObj<CommentTextBoxComponent>;

export const Default: Story = {
  name: 'Default',
};

export const WithToolbar: Story = {
  name: 'With Toolbar',
  args: {
  }
};


// export const WithToolbar: Story = {
//   name: 'With Toolbar',
//   render: (args) => ({
//     props: args,
//     moduleMetadata: {
//       imports: [CommentTextBoxToolbarComponent],
//       providers: [QuillService]
//     },
//     template: `
//       <lib-comment-text-box></lib-comment-text-box>
//       <lib-comment-text-box-toolbar></lib-comment-text-box-toolbar>
//     `,
//   }),
// };
