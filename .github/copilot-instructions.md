# Copilot Instructions for pw-practice-app

This is a **Playwright UI automation practice project** built on ngx-admin (Angular 14 + Nebular). The codebase demonstrates web automation testing patterns and Angular component interactions.

## Project Overview

- **Frontend**: Angular 14 application with Nebular UI framework
- **Testing**: Playwright (`@playwright/test`) for browser automation
- **Architecture**: Feature-based structure with core module providing mock data services
- **Purpose**: Practice UI automation against real Angular components (Forms, Tables, Charts, etc.)

## Critical Developer Workflows

### Running the Application
```bash
npm start
# Starts Angular dev server on http://localhost:4200 (ng serve)
# Required before running Playwright tests
```

### Running Playwright Tests
```bash
npx playwright test              # Run all tests headlessly
npx playwright test --ui         # Interactive test explorer (recommended)
npx playwright test test4-*.spec.ts  # Run specific test files
```

### Test Configuration & Timeouts
- **Global test timeout**: 40 seconds (`playwright.config.ts`)
- **Trace collection**: Enabled on first retry for debugging
- **Browser**: Chromium only (commented out: Firefox, WebKit, mobile profiles)
- **Parallelization**: Enabled by default (workers managed by CI env var)
- **Reports**: HTML reporter generates in `playwright-report/`

## Architecture & Key Patterns

### Feature Directory Structure
- `src/app/@core/` - Core services & data providers
  - `data/` - Data interfaces (e.g., `users.ts`, `electricity.ts`)
  - `mock/` - Service implementations providing mock data
  - `utils/` - Analytics, Layout, SEO services
- `src/app/@theme/` - Nebular theme components & styling
- `src/app/pages/` - Feature pages (charts, forms, tables, modals)

### Data Flow Pattern
1. **Data Interface** (`src/app/@core/data/users.ts`): Defines data shape
2. **Mock Service** (`src/app/@core/mock/users.service.ts`): Implements data provider
3. **Module Registration** (`core.module.ts`): Injects services as providers
4. **Component Usage**: Components inject services to populate UI

Example: `UserData` interface → `UserService` → injected in components using forms

### Playwright Test Patterns

**User-Facing Locators** (preferred over CSS/XPath):
- `page.getByRole()` - Accessible elements (buttons, textboxes, etc.)
- `page.getByLabel()` - Form labels
- `page.getByPlaceholder()` - Input placeholders
- `page.getByText()` - Navigation by visible text

**Nebular Component Locators** (specific to this codebase):
```typescript
// Card with specific text + child element
page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })

// Nth card followed by button
page.locator('nb-card').nth(4).getByRole('button', { name: 'submit' })

// Filter cards by content
page.locator('nb-card').filter({ hasText: 'Form without labels' }).getByRole('textbox')
```

**Test Hooks** (`beforeEach`, `afterEach`):
- Shared navigation setup across test suites
- Example: `beforeEach` loads home, clicks Forms → Form Layouts

**Assertions**:
- Generic: `expect(value).toEqual(expectedValue)`
- Locator-based: `expect(locator).toHaveValue()`, `expect(locator).toBeVisible()`

## Test Organization

Tests are organized by topic in `/tests/`:
- `test1-hooks-basic.spec.ts` - Test structure & beforeEach patterns
- `test2-userfacinglocators.spec.ts` - User-facing locator patterns
- `test3-autoWaits.spec.ts` - Auto-wait & retry behavior
- `test4-UiComponents.spec.ts` - Form interaction patterns (fill, clear, assert)

**Convention**: Each test file demonstrates a specific Playwright concept with Forms as the common UI target.

## Key Dependencies & Integrations

- **Angular 14** with Nebular 10.0.0 UI components
- **@nebular/auth, @nebular/security** - Not actively used in tests but imported
- **ngx-charts, ECharts** - Chart visualizations (practice targets)
- **Bootstrap 4.3** - Base CSS framework
- **Leaflet** - Map components

## Important Notes for AI Agents

1. **App must be running** - Tests require `npm start` in a separate terminal before test execution
2. **Nebular locators** - Use `nb-card`, `nb-radio` element names when navigating Nebular-specific components
3. **Test isolation** - Each test is independent; `beforeEach` ensures clean state navigation
4. **Mock data only** - All data is mock (no real backend); forms submission is for UI testing only
5. **Playwright traces** - Failed tests generate trace files in `playwright-report/` for debugging
