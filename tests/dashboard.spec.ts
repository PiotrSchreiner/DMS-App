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

test("Zeigt Nachricht wenn keine Dokumente gefunden wurden", async ({
  page,
}) => {
  await page.goto("/");
  const searchInput = page.locator('input[placeholder="Dateiname suchen..."]');
  await searchInput.fill("Nicht-existierende-Datei-12345");
  const emptyMessage = page.locator("text=Keine Dateien gefunden");
  await expect(emptyMessage).toBeVisible();
});
