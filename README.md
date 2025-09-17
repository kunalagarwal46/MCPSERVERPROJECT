# Playwright Test Automation Project

This project contains end-to-end tests using Playwright Test framework.

## Prerequisites

- Node.js 14 or higher
- npm (comes with Node.js)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in UI mode:
```bash
npx playwright test --ui
```

Run tests in a specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a specific test file:
```bash
npx playwright test tests/sample.spec.js
```

Debug tests:
```bash
npx playwright test --debug
```

## Test Structure

- `tests/` - Contains all test files
  - `sample.spec.js` - Example test suite with common test patterns

## Configuration

The test configuration is in `playwright.config.js`. Key settings include:

- Browsers: Chrome, Firefox, and Safari
- Automatic screenshots on test failure
- Video recording on test failure
- Retry failed tests in CI
- Parallel test execution
- HTML test reports

## CI/CD Integration

This project includes GitHub Actions workflow configuration in `.github/workflows/playwright.yml`. Tests will run automatically on:

- Push to main/master branch
- Pull requests to main/master branch

## Test Reports

After test execution, you can find:
- HTML report in `playwright-report/` directory
- Screenshots of failed tests in `test-results/` directory
- Test videos (if tests failed) in `test-results/` directory

## Best Practices

1. Use page object model for better maintainability
2. Keep test data separate from test logic
3. Use meaningful test descriptions
4. Group related tests using `test.describe`
5. Use test hooks (`beforeEach`, `afterEach`) for common setup/teardown
6. Tag tests appropriately (e.g., @smoke, @regression)
7. Keep tests independent and atomic