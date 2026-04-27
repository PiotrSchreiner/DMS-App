import { expect, test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

test("Vollständiger Datei-Upload Flow", async ({ page }, testInfo) => {
  if (testInfo.project.name !== "firefox") {
    test.skip();
  }

  await page.goto("/");

  const uniqueFileName = `test-upload-${Date.now()}.txt`;
  const tempFilePath = path.join(__dirname, uniqueFileName);
  fs.writeFileSync(tempFilePath, "Dies ist eine automatisierte Test-Datei.");

  try {
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(tempFilePath);

    const uploadButton = page.getByRole("button", { name: /Upload/i });
    await expect(uploadButton).toBeEnabled({ timeout: 10000 });
    await uploadButton.click();

    const successRow = page.locator(`text=${uniqueFileName}`);
    await expect(successRow).toBeVisible({ timeout: 15000 });
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
});
