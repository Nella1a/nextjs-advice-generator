// @ts-check at the start of each test file when using JavaScript in VS Code to get automatic type checking.
import { expect, test } from '@playwright/test';

test('navigation ', async ({ page }) => {
  //starting at home
  await page.goto('/');
  await expect(page).toHaveTitle('Advice Generator');
  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();

  // to search advice
  await page.getByTestId('nav-link-search').click();
  await expect(page).toHaveURL('/advice/search');
  await expect(
    page.getByRole('heading', { name: 'Search Advice' }),
  ).toBeVisible();
  await expect(page.getByTestId('search-box')).toBeVisible();

  // to random advice
  await page.getByTestId('nav-link-random').click();
  await expect(page).toHaveURL('/advice/random');
  await expect(
    page.getByRole('heading', { name: 'Random Advice' }),
  ).toBeVisible();
  expect(page.getByText('Press the button to receive your first advice.'))
    .toBeVisible;

  // return to home
  await page.getByTestId('nav-link-home').click();
  await expect(page).toHaveURL('/');
  await expect(page).toHaveTitle('Advice Generator');
  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();
});
