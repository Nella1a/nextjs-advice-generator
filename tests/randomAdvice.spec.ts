// @ts-check at the start of each test file when using JavaScript in VS Code to get automatic type checking.
import { expect, test } from '@playwright/test';

test('navigate to "random advice page" via button', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Advice Generator');
  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();

  // click button
  await page.getByRole('link', { name: 'Random Advice' }).click();
  await expect(page).toHaveURL('/advice/random');
  await expect(
    page.getByRole('heading', { name: 'Random Advice' }),
  ).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({ hasText: 'Press the button to receive your first advice!' }),
  ).toBeVisible();
});

test('navigate to "random advice page" via nav-link', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Advice Generator');
  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();

  // click nav-link
  await page.getByTestId('nav-link-random').click();
  await expect(page).toHaveURL('/advice/random');
  await expect(
    page.getByRole('heading', { name: 'Random Advice' }),
  ).toBeVisible();

  expect(page.getByText('Press the button to receive your first advice.'))
    .toBeVisible;
});

test('get your first random advice', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Advice Generator');
  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();

  // Mock the api call before navigating
  await page.route('https://api.adviceslip.com/advice', async (route) => {
    const json = {
      slip: { id: 192, advice: "Don't take it personally - TEST" },
    };
    await route.fulfill({ json });
  });

  // press button
  await page.getByRole('link', { name: 'Random Advice' }).click();
  await expect(page).toHaveURL('/advice/random');
  await expect(
    page.getByRole('heading', { name: 'Random Advice' }),
  ).toBeVisible();

  expect(page.getByText('Press the button to receive your first advice.'))
    .toBeVisible;

  // request random advice
  await page.getByRole('button', { name: '' }).click();

  // result
  await expect(page.getByText('ADVICE #192')).toBeVisible();
  await expect(page.getByText("Don't take it personally - TEST")).toBeVisible();
});
