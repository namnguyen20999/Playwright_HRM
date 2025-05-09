# Playwright Testing Framework
## 1. Overview
This project is a Playwright-based end-to-end testing framework designed to test the OrangeHRM application. 
It is built using TypeScript for type safety and maintainability, and it integrates with GitHub Actions for CI/CD. 
The framework also supports Allure Reports for detailed test reporting.

## 2. Framework Structure
#### 2.1 Directory Structure
```plaintext
├── api                         
│   └── models
│       └── user.ts            
├── data
│   ├── admin-records.ts
│   └── login-credential.ts
├── fixtures
│   ├── storageState.ts
│   └── ui-fixture.ts
├── package-lock.json
├── package.json
├── playwright.config.ts
├── tests
│   ├── api
│   │   └── adminApi.spec.ts
│   ├── base_UI
│   │   └── Components
│   │       ├── RecordTable.ts
│   │       └── SidePanel.ts
│   ├── e2e
│   │   ├── admin.spec.ts
│   │   └── login.spec.ts
│   └── pages
│       ├── AdminPage.ts
│       ├── BasePage.ts
│       ├── DashboardPage.ts
│       └── LoginPage.ts
├── tsconfig.json
└── utils
    └── auth
        └── storageState.json
```


#### 2.2 Folder & File Explanation

**api/**

Contains models and typings used for API-related operations.
- **models/user.ts**: Defines the data model (interface/type) for a user, used in API requests or validations.

**data/**

Holds static or parameterized test data.
- **admin-records.ts**: Contains mock or predefined records used for testing admin functionalities.
- **login-credential.ts**: Stores sample credentials used in login tests.

**fixtures/**

Includes reusable setup logic or environment states for tests.
- **storageState.ts**: Manages session state (e.g., logged-in cookies) used across tests.
- **ui-fixture.ts**: Contains UI-specific fixtures like test setup, teardown, and shared context.

**tests/**

Main directory for organizing all Playwright test cases.

**tests/api/**

- **adminApi.spec.ts**: Tests for backend/admin API endpoints.

**tests/base_UI/Components/**

Reusable UI component classes, typically for low-level UI interactions.
- **RecordTable.ts**: Represents the logic to interact with a table of records.
- **SidePanel.ts**: Represents side navigation or panel behaviors.

**tests/e2e/**

End-to-end tests that simulate real user flows.
- **admin.spec.ts**: Full-flow tests covering admin workflows.
- **login.spec.ts**: Tests covering the login process.

**tests/pages/**

Implements the Page Object Model (POM) pattern for UI interaction abstraction.
- **AdminPage.ts**: Encapsulates admin-specific page selectors and actions.
- **BasePage.ts**: Shared base class for common page methods (e.g., navigation, waits).
- **Dashboard.ts**: Page object for dashboard-specific behaviors.
- **LoginPage.ts**: Handles login page logic like input credentials, submitting forms.

**utils/**

Stores utility helpers or service logic.
- **auth/storageState.json**: JSON file representing a saved browser storage state for authentication reuse.

**playwright.config.ts**

Playwright configuration file defining browser settings, test runner options, reporter configs, etc.

**package.json** & **package-lock.json**

Manage dependencies and scripts:
- **package.json**: Lists dependencies and npm scripts.
- **package-lock.json**: Ensures consistent installs across environments.

**tsconfig.json**

TypeScript configuration file controlling compiler options for type-checking and transpiling.

## 3. Setup Instructions
### 3.1 Prerequisites
- Node.js (v14 or later)
- npm or yarn

### 3.2 Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
   
2. Install dependencies:
   ```bash
    npm install
    ```
   
3. Run the tests:
   ```bash
   npx playwright test
   ```

> **Note:** Occasionally, the `storageState.json` file may expire, causing API requests to be rejected. 
> In such cases, delete the `storageState.json` file and re-run the test.

4. Generate Allure reports:
   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```

5. Open Allure report:
   ```bash
    npx allure open allure-report
    ```