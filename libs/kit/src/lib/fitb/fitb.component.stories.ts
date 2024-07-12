import { Meta, StoryObj } from '@storybook/angular';
import { FITBComponent } from './fitb.component';
import { FITB_EXAMPLES } from '../constants/fitb-examples';

const meta: Meta<FITBComponent> = {
  component: FITBComponent,
  title: 'FITB',
  render: (args) => ({
    props: args,
    styles: [
      `
      lib-fitb {
        max-width: 620px;
        display: block;
      }
      `,
    ],
  }),
};
export default meta;
type Story = StoryObj<FITBComponent>;

export const Widget: Story = {
  name: 'Widget Configuration',
  args: { ...FITB_EXAMPLES['Naologic widget'] },
};

export const House: Story = {
  name: 'House Configuration',
  args: FITB_EXAMPLES['House Construction'],
};

export const User: Story = {
  name: 'Account Registration',
  args: FITB_EXAMPLES['Account Creation'],
};

export const Error: Story = {
  args: FITB_EXAMPLES['error'],
};
