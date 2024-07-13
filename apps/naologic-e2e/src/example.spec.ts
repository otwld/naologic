import { test, expect, Page } from '@playwright/test';

async function selectExample(page: Page, exampleName: string) {
  // Click the dropdown button.
  await page.locator('button').first().click();

  // Should have buttons inside dropdown-menu
  expect(await page.locator('.dropdown-menu button').count()).toBeGreaterThan(
    1
  );

  // Select the index of the example.
  await page.locator('.dropdown-menu button').getByText(exampleName).click();

  // Expect the selected example to be displayed in the button text.
  expect(await page.locator('button').first().innerText()).toContain(
    exampleName
  );
}

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('FITB Component');
});

/**
 * Select "Naologic widget" example and expect the FITB component to be rendered.
 * Then select "House Construction" example and expect the FITB component to be rendered.
 * Click the dropdown button with text "Modern" and select the option with text "Traditional".
 * Expect the button to contain the text "Traditional".
 * Expect the button with text "Include solar panels?" to be removed.
 */
test('can select examples', async ({ page }) => {
  await page.goto('/');

  await selectExample(page, 'Naologic widget');

  // Expect the FITB component to be rendered.
  expect(await page.locator('lib-fitb').count()).toBe(1);

  // Expect the FITB component to contain an input with a placeholder.
  await expect(
    page.locator('lib-fitb input').first()
  ).toHaveAttribute('placeholder', 'Enter widget name');

  // Expect the FITB component to contain a button with a text.
  await expect(page.locator('lib-fitb button').first()).toHaveText(
    'Simple'
  );

  await selectExample(page, 'House Construction');

  // Expect the FITB component to be rendered.
  expect(await page.locator('lib-fitb').count()).toBe(1);

  // Expect the FITB component to contain button with value "Include solar panels?".
  await expect(
    page
      .locator('lib-fitb button')
      .getByText('Include solar panels?')

  ).toHaveText('Include solar panels?');

  // Click dropdown button with text "Modern"
  await page.locator('lib-fitb button').getByText('Modern').first().click();

  // Select in the dropdown menu the option with text "Traditional"
  await page
    .locator('.dropdown-menu button')
    .getByText('Traditional')
    .first()
    .click();

  // The button should now contain the text "Traditional"
  await expect(
    page
      .locator('lib-fitb button')
      .getByText('Traditional')
      .first()

  ).toHaveText('Traditional');

  // Expect the FITB component to not contain button with value "Include solar panels?".
  expect(
    await page
      .locator('lib-fitb button')
      .getByText('Include solar panels?')
      .count()
  ).toBe(0);
});
