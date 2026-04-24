import { expect, test } from "@playwright/test";

test("Dashboard lädt und zeigt Titel an", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("DMS Dashboard");
});

test("Suchfeld ist funktionsfähig", async ({ page }) => {
  await page.goto("/");
  const searchInput = page.locator('input[placeholder="Dateiname suchen..."]');
  await expect(searchInput).toBeVisible();
  await searchInput.fill("Test-Datei");
  await expect(searchInput).toHaveValue("Test-Datei");
});
