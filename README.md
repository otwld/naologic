# Naologic Technical Assessment

This repository is a NX workspace that contains multiple libraries and applications developed as part of the technical assessment for Naologic. It includes component libraries, shared themes, an application to demonstrate usage, and end-to-end tests. Below is a detailed overview of the workspace structure and functionality.

## Introduction

This technical assessment was both challenging and exciting, providing a great opportunity to showcase my skills. Throughout the project, I identified several areas for improvement, such as implementing stronger typing with template generics and enhancing the CSS by using Tailwind classes instead of cluttering the HTML.

I aimed to demonstrate my proficiency as an Angular developer while also showcasing my capabilities as a well-rounded fullstack developer (CI/CD, e2e testing, Storybook, Docker, Google Cloud, etc..).

I hope you will enjoy reading my code. I am eager to work for a company that leverages Angular to its fullest potential. While I recognize the need to become more consistent, I am confident that I already possess the knowledge needed, albeit separately. What I truly need is the supervision and mentorship of a real Angular expert, which has been challenging to find.

## Known Room for Improvement

- [ ] Filters: Adding and combining filters to the FITB component should be more intuitive (e.g., using AbstractClasses, separating the concerns, etc...).
- [ ] CSS: The CSS could be improved by using Tailwind classes instead of cluttering the HTML.
- [ ] Typing: Stronger typing with template generics could be implemented.
- [ ] Pixel-Perfect Accuracy: Input width should be adjusted to match the sketch more closely.
  - 💡You can check this [website](https://otwld.com/) to see my pixel-perfect accuracy.
- [ ] FITB Field Types: The FITB component should support different field types (e.g., text, number, date, password, etc...).
- [ ] FITB Field Validation: The FITB component should support more field validation (e.g., min, max, etc...).
- [ ] FITB Form Output Typing: The FITB component should output a typed form object.
- [ ] FITB Rendering: The FITBComponent & FITBFieldControlComponent should share their rendering logic.

### Deployment

The live version of the application is deployed on Google Cloud Run using a Docker image. You can access it via the following URL:

- [Live Application](https://naologic-csx7mnamxa-uc.a.run.app/)
- [Storybook](https://668fa22850553b4d3c2ae719-bkwzfvksfd.chromatic.com/)

## Workspace Structure

### Libraries

#### Library: Kit

- **Purpose**: Contains reusable components used by applications.
- **Features**:
  - **Storybook**: Simplifies development by isolating components. Supports interaction testing and visual testing using Chromatic.
  - **Components**: Includes various controls and components such as FITB (Fill in the Blanks), SelectWithOptions, etc.
  - **Config**: Contains shared configurations (e.g., the FITB component configuration provided for the technical assessment).

#### Library: Theme

- **Purpose**: Contains shared styles and configurations.
- **Features**:
  - **Shared styles.css**: Common styles used across the applications.
  - **Shared Tailwind Config**: Tailwind preset configuration for consistent styling.

### Applications

#### App: Naologic

- **Purpose**: Demonstrates the usage of components from the Kit library.
- **Features**:
  - **Hydration & SSR**: Supports server-side rendering and hydration.
  - **FITBComponent & SelectWithOptionsComponent**: Displays different examples of the FITBComponent.
  - **Debugging Components**: Helps reviewers understand the state and behavior of the FITB component and others.

#### App: Naologic-e2e

- **Purpose**: Provides end-to-end testing examples using Playwright.
- **Features**: Contains various e2e test cases to validate the functionality of the applications.

### CI/CD and Workspace Tools

#### .Github

- **CI Configuration**: Simple Continuous Integration (CI) setup with NX-Cloud that includes:
  - **Testing**: Runs unit tests.
  - **Linting**: Checks for code quality.
  - **Building**: Builds the affected projects.
  - **E2E Testing**: Executes end-to-end tests on affected projects.

#### Workspace

- **Husky**: Implements pre-commit and pre-push hooks to ensure code quality and prevent faulty code from being pushed to the repository.

## Getting Started

### Prerequisites

- Node.js (version 18.x.x)
- Nx CLI (version 19.x.x)

### Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:otwld/naologic.git
   cd naologic-assessment
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Applications

1. **Storybook**:

   ```sh
   nx storybook kit
   ```

2. **Naologic App**:

   ```sh
   nx serve naologic
   ```

3. **End-to-End Tests**:
   ```sh
   nx e2e naologic-e2e
   ```

### Running CI Locally

To run the CI tasks locally, use the following command:

```sh
   nx affected -t test lint build
   nx affected -t e2e
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

TREHOUT Nathan - [ntrehout@otwld.com](mailto:ntrehout@otwld.com)
