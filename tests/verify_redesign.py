import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

SCREENSHOT_DIR = r"c:\Users\kabee\OneDrive\Desktop\AUREO-Portfolio\tests\screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def test_features():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1440,900")
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    driver = webdriver.Chrome(options=options)

    # Use whatever port preview selected (4174 or 4173)
    urls_to_try = ["http://localhost:4174/kabeer-portfolio/", "http://localhost:4173/kabeer-portfolio/"]
    base_url = None
    for u in urls_to_try:
        try:
            driver.get(u)
            if "AUREO" in driver.title:
                base_url = u
                break
        except Exception:
            pass

    print(f"Connected to preview at: {base_url}")

    try:
        time.sleep(1)
        # Skip intro
        try:
            skip_btn = driver.find_element(By.XPATH, "//button[contains(., 'Skip Intro')]")
            skip_btn.click()
            time.sleep(1.5)
        except Exception:
            pass

        # 1. Desktop Hero Screenshot
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "v2_01_hero_desktop_1440.png"))
        print("Captured v2_01_hero_desktop_1440.png")

        # 2. Hover and interact with Classical Face Emblem
        emblem = driver.find_element(By.XPATH, "//div[@role='img' and contains(@aria-label, 'classical')]")
        action = webdriver.ActionChains(driver)
        action.move_to_element_with_offset(emblem, 30, -30).click().perform()
        time.sleep(0.5)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "v2_02_emblem_interacted_1440.png"))
        print("Captured v2_02_emblem_interacted_1440.png")

        # 3. Scroll to Garage Bays and capture closed shutters
        garage_sec = driver.find_element(By.ID, "garage")
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", garage_sec)
        time.sleep(1)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "v2_03_garage_bays_closed_1440.png"))
        print("Captured v2_03_garage_bays_closed_1440.png")

        # 4. Click first garage bay to trigger shutter lifting animation
        first_bay = driver.find_element(By.XPATH, "//section[@id='garage']//div[@role='button']")
        first_bay.click()
        time.sleep(0.3)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "v2_04_garage_bay_lifting_1440.png"))
        print("Captured v2_04_garage_bay_lifting_1440.png")

        # Wait for full dossier to open
        time.sleep(0.8)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "v2_05_garage_dossier_open_1440.png"))
        print("Captured v2_05_garage_dossier_open_1440.png")

        # Close dossier
        close_btn = driver.find_element(By.XPATH, "//button[@aria-label='Close project dossier']")
        close_btn.click()
        time.sleep(0.5)

        # 5. Mobile Breakpoint 390x844
        driver.set_window_size(390, 844)
        time.sleep(0.8)
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(0.5)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "v2_06_hero_mobile_390.png"))
        print("Captured v2_06_hero_mobile_390.png")

        # Scroll to garage on mobile
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", garage_sec)
        time.sleep(0.5)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "v2_07_garage_mobile_390.png"))
        print("Captured v2_07_garage_mobile_390.png")

        # Check console logs
        print("\n--- BROWSER CONSOLE LOGS ---")
        logs = driver.get_log("browser")
        severe_count = 0
        for entry in logs:
            if entry.get("level") in ("SEVERE", "WARNING"):
                print(f"[{entry['level']}] {entry['message']}")
                if entry.get("level") == "SEVERE":
                    severe_count += 1
        if severe_count == 0:
            print("ZERO SEVERE browser console errors!")
        else:
            print(f"{severe_count} SEVERE browser console errors detected.")

    finally:
        driver.quit()

if __name__ == "__main__":
    test_features()
