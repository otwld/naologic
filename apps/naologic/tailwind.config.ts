import { join } from 'path';
import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { Config } from 'tailwindcss';

// Tailwind is not able to use TypeScript's path mapping, so we need to import relatively
// eslint-disable-next-line @nx/enforce-module-boundaries
import { defaultPreset } from '../../libs/theme/src/lib/tailwind/default-preset';

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [defaultPreset],
} satisfies Config;
