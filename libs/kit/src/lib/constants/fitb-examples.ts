import { FITBConfig } from '../fitb/fitb.types';

type FITB_EXAMPLE_NAMES =
  | 'Naologic widget'
  | 'Account Creation'
  | 'House Construction'
  | 'error';

export function isFITBExampleName(value: string): value is FITB_EXAMPLE_NAMES {
  return [
    'Naologic widget',
    'Account Creation',
    'House Construction',
    'error',
  ].includes(value);
}

export const FITB_EXAMPLES: Record<FITB_EXAMPLE_NAMES, FITBConfig> = {
  'Naologic widget': {
    formConfig: {
      name: {
        placeholder: 'Enter widget name',
        default: null,
        type: 'input',
      },

      labelType: {
        placeholder: 'Label type',
        default: 'no-label',
        type: 'select-with-options',

        options: [
          {
            name: 'Simple',
            value: 'no-label',
          },
          {
            name: 'Currency',
            value: 'currency',
          },
          {
            name: 'Custom label',
            value: 'custom-label',
          },
        ],
      },

      labelCurrency: {
        placeholder: 'Label currency',
        default: null,
        type: 'select-with-options',
        options: [
          {
            name: 'USD',
            value: 'usd',
          },
          {
            name: 'EURO',
            value: 'euro',
          },
          {
            name: 'Pound',
            value: 'pound',
          },
        ],
      },

      labelTextPrefix: {
        placeholder: 'Prefix',
        default: null,
        type: 'input',
      },

      labelTextSuffix: {
        placeholder: 'Suffix',
        default: null,
        type: 'input',
      },
    },
    data: [
      {
        type: 'text',
        data: 'Please enter the widget name:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'name',
        validators: [{ type: 'required' }, { type: 'minLength', minLength: 3 }],
      },
      {
        type: 'text',
        data: ', now pick the display label type:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'labelType',
        validators: [{ type: 'required' }],
        nodes: [
          {
            filter: {
              $in: ['currency'],
            },
            children: [
              {
                type: 'text',
                data: 'Pick currency:',
              },
              {
                type: 'fieldControl',
                formDataPointer: 'labelCurrency',
                validators: [{ type: 'required' }],
              },
            ],
          },
          {
            filter: {
              $in: ['custom-label'],
            },
            children: [
              {
                type: 'text',
                data: 'Label text prefix:',
              },
              {
                type: 'fieldControl',
                formDataPointer: 'labelTextPrefix',
                validators: [],
              },
              {
                type: 'text',
                data: 'Label text suffix:',
              },
              {
                type: 'fieldControl',
                formDataPointer: 'labelTextSuffix',
                validators: [],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        data: '. After you configure the widget, we are ready for displaying it in your workspace.',
      },
    ],
  },
  'Account Creation': {
    formConfig: {
      username: {
        placeholder: 'Enter username',
        default: null,
        type: 'input',
      },
      password: {
        placeholder: 'Enter password',
        default: null,
        type: 'input',
      },
      email: {
        placeholder: 'Enter email address',
        default: null,
        type: 'input',
      },
      userRole: {
        placeholder: 'Select user role',
        default: 'user',
        type: 'select-with-options',
        options: [
          {
            name: 'User',
            value: 'user',
          },
          {
            name: 'Admin',
            value: 'admin',
          },
          {
            name: 'Guest',
            value: 'guest',
          },
        ],
      },
      adminCode: {
        placeholder: 'Enter admin code',
        default: null,
        type: 'input',
      },
      newsletterSubscription: {
        placeholder: 'Subscribe to newsletter',
        default: false,
        type: 'select-with-options',
        options: [
          {
            value: 'Yes',
            name: 'Yes',
          },
          {
            value: 'No',
            name: 'No',
          },
        ],
      },
    },
    data: [
      {
        type: 'text',
        data: 'Please enter your username:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'username',
        validators: [{ type: 'required' }, { type: 'minLength', minLength: 5 }],
      },
      {
        type: 'text',
        data: 'Enter your password:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'password',
        validators: [{ type: 'required' }, { type: 'minLength', minLength: 8 }],
      },
      {
        type: 'text',
        data: 'Enter your email address:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'email',
        validators: [{ type: 'required' }, { type: 'email' }],
      },
      {
        type: 'text',
        data: 'Select your role:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'userRole',
        validators: [{ type: 'required' }],
        nodes: [
          {
            filter: {
              $in: ['admin'],
            },
            children: [
              {
                type: 'text',
                data: 'Enter admin code:',
              },
              {
                type: 'fieldControl',
                formDataPointer: 'adminCode',
                validators: [{ type: 'required' }],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        data: 'Would you like to subscribe to our newsletter?',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'newsletterSubscription',
        validators: [],
      },
      {
        type: 'text',
        data: '. Once you complete the registration form, click submit to create your account.',
      },
    ],
  },
  'House Construction': {
    formConfig: {
      projectName: {
        placeholder: 'Enter project name',
        default: null,
        type: 'input',
      },
      constructionType: {
        placeholder: 'Select construction type',
        default: 'residential',
        type: 'select-with-options',
        options: [
          {
            name: 'Residential',
            value: 'residential',
          },
          {
            name: 'Commercial',
            value: 'commercial',
          },
        ],
      },
      numberOfFloors: {
        placeholder: 'Number of floors',
        default: null,
        type: 'input',
      },
      floorMaterial: {
        placeholder: 'Select floor material',
        default: null,
        type: 'select-with-options',
        options: [
          {
            name: 'Wood',
            value: 'wood',
          },
          {
            name: 'Tile',
            value: 'tile',
          },
          {
            name: 'Carpet',
            value: 'carpet',
          },
        ],
      },
      roofType: {
        placeholder: 'Select roof type',
        default: 'flat',
        type: 'select-with-options',
        options: [
          {
            name: 'Flat',
            value: 'flat',
          },
          {
            name: 'Gable',
            value: 'gable',
          },
          {
            name: 'Hip',
            value: 'hip',
          },
        ],
      },
      interiorStyle: {
        placeholder: 'Select interior style',
        default: 'modern',
        type: 'select-with-options',
        options: [
          {
            name: 'Modern',
            value: 'modern',
          },
          {
            name: 'Traditional',
            value: 'traditional',
          },
          {
            name: 'Contemporary',
            value: 'contemporary',
          },
        ],
      },
      solarPanels: {
        placeholder: 'Include solar panels?',
        default: null,
        type: 'select-with-options',
        options: [
          {
            value: 'Yes',
            name: 'Yes',
          },
          {
            value: 'No',
            name: 'No',
          },
        ],
      },
      swimmingPool: {
        placeholder: 'Include swimming pool?',
        default: null,
        type: 'select-with-options',
        options: [
          {
            value: 'Yes',
            name: 'Yes',
          },
          {
            value: 'No',
            name: 'No',
          },
        ],
      },
    },
    data: [
      {
        type: 'text',
        data: 'Please enter the project name:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'projectName',
        validators: [{ type: 'required' }],
      },
      {
        type: 'text',
        data: 'Select the type of construction:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'constructionType',
        validators: [{ type: 'required' }],
      },
      {
        type: 'text',
        data: 'Enter the number of floors:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'numberOfFloors',
        validators: [{ type: 'required' }],
      },
      {
        type: 'text',
        data: 'Select the floor material:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'floorMaterial',
        validators: [{ type: 'required' }],
      },
      {
        type: 'text',
        data: 'Select the roof type:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'roofType',
        validators: [{ type: 'required' }],
      },
      {
        type: 'text',
        data: 'Select the interior style:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'interiorStyle',
        validators: [{ type: 'required' }],
        nodes: [
          {
            filter: {
              $in: ['modern', 'contemporary'],
            },
            children: [
              {
                type: 'text',
                data: 'Would you like to include solar panels?',
              },
              {
                type: 'fieldControl',
                formDataPointer: 'solarPanels',
                validators: [{ type: 'required' }],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        data: 'Would you like to include a swimming pool?',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'swimmingPool',
        validators: [{ type: 'required' }],
      },
      {
        type: 'text',
        data: 'Once you complete the form, click submit to finalize the construction project details.',
      },
    ],
  },
  error: {
    formConfig: {},
    data: [
      {
        type: 'text',
        data: 'Please enter your age:',
      },
      {
        type: 'fieldControl',
        formDataPointer: 'age',
        validators: [],
      },
    ],
  },
};
