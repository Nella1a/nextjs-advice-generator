// @ts-check at the start of each test file when using JavaScript in VS Code to get automatic type checking.
import { expect, test } from '@playwright/test';

test('navigate to "search advice page" via button', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Advice Generator');
  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();

  await page.getByRole('link', { name: 'Search Advice' }).click();
  await expect(page).toHaveURL('/advice/search');
  await expect(
    page.getByRole('heading', { name: 'Search Advice' }),
  ).toBeVisible();

  // search box
  await expect(page.getByTestId('search-box')).toBeVisible();
});

test('navigate to "search advice page" via nav-link', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Advice Generator');
  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();

  await page.getByTestId('nav-link-search').click();
  await expect(page).toHaveURL('/advice/search');
  await expect(
    page.getByRole('heading', { name: 'Search Advice' }),
  ).toBeVisible();

  // search box
  await expect(page.getByTestId('search-box')).toBeVisible();
});

test('add keyword and search advice', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Advice Generator');

  await expect(page.getByRole('link', { name: 'Search Advice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Random Advice' })).toBeVisible();

  // Mock the api call before navigating
  await page.route(
    'https://api.adviceslip.com/advice/search/tree',
    async (route) => {
      const json = {
        total_results: '1',
        query: 'tree',
        slips: [{ id: 175, advice: 'Plant a tree - TEST', date: '2015-12-30' }],
      };
      await route.fulfill({ json });
    },
  );

  await page.getByRole('link', { name: 'Search Advice' }).click();
  await expect(page).toHaveURL('/advice/search');
  await expect(
    page.getByRole('heading', { name: 'Search Advice' }),
  ).toBeVisible();

  // add keyword
  await page.getByTestId('search-box').fill('tree');
  await page.getByRole('button', { name: '' }).click();

  // result
  await expect(page.getByText('#175')).toBeVisible();
  await expect(page.getByText('Plant a tree - TEST')).toBeVisible();
});
