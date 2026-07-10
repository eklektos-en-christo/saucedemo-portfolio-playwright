# SauceDemo Test Automation

A beginner-level end-to-end test automation project for saucedemo.com, built with Playwright and TypeScript. Uses the Page Object Model (POM) architecture to reduce code duplication and improve maintainability. Tests run automatically via GitHub Actions on every push.

## Functionality Tested

- **Login** — successful login, failed login, locked out user, empty field validation
- **Inventory** — page elements, product details
- **Cart** — add to cart, remove from cart, item info visibility, cart checkout
- **Checkout** — full checkout flow, form validation

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run a specific file:
```bash
npx playwright test tests/login.spec.ts
```

Run with browser visible (headed mode):
```bash
npx playwright test --headed
```

By default tests run in headless mode.

## View Test Report

```bash
npx playwright show-report
```