import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

SCREENSHOT_DIR = r"c:\Users\kabee\OneDrive\Desktop\AUREO-Portfolio\tests\screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def run_tests():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1440,900")
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 10)

    try:
        url = "http://localhost:4173/kabeer-portfolio/"
        print(f"Navigating to {url}...")
        driver.get(url)
        time.sleep(1.5)

        # 1. Capture 1440px Intro
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "01_intro_1440.png"))
        print("Captured 01_intro_1440.png")

        # Check for Ignite button
        ignite_btn = driver.find_element(By.XPATH, "//button[contains(., 'IGNITE EXPERIENCE')]")
        print("Found Ignite Experience button. Clicking it...")
        ignite_btn.click()

        # Wait for intro animation to complete (approx 1.5s)
        time.sleep(2)

        # 2. Capture Hero
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "02_hero_1440.png"))
        print("Captured 02_hero_1440.png")

        # 3. Scroll to About section and capture
        owner_sec = driver.find_element(By.ID, "owner")
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", owner_sec)
        time.sleep(1)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "03_about_1440.png"))
        print("Captured 03_about_1440.png")

        # 4. Scroll to Garage and capture
        garage_sec = driver.find_element(By.ID, "garage")
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", garage_sec)
        time.sleep(1)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "04_garage_1440.png"))
        print("Captured 04_garage_1440.png")

        # 5. Click first project card to open Dossier
        first_card = driver.find_element(By.XPATH, "//section[@id='garage']//div[@role='button']")
        print("Clicking first project card to open Dossier...")
        first_card.click()
        time.sleep(1)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "05_dossier_1440.png"))
        print("Captured 05_dossier_1440.png")

        # 6. Close Dossier
        close_btn = driver.find_element(By.XPATH, "//button[@aria-label='Close project dossier']")
        close_btn.click()
        time.sleep(0.5)

        # 7. Test search filter
        search_input = driver.find_element(By.XPATH, "//input[@aria-label='Search collection']")
        search_input.send_keys("Plate")
        time.sleep(0.5)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "06_search_plate_1440.png"))
        print("Captured 06_search_plate_1440.png")

        # Clear search
        search_input.clear()
        time.sleep(0.5)

        # 8. Scroll to Engineering / Skills
        skills_sec = driver.find_element(By.ID, "engineering")
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", skills_sec)
        time.sleep(1)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "07_skills_1440.png"))
        print("Captured 07_skills_1440.png")

        # 9. Scroll to Selected Works
        works_sec = driver.find_element(By.ID, "works")
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", works_sec)
        time.sleep(1)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "08_works_1440.png"))
        print("Captured 08_works_1440.png")

        # 10. Scroll to Signature / Contact
        contact_sec = driver.find_element(By.ID, "signature")
        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", contact_sec)
        time.sleep(1)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "09_contact_1440.png"))
        print("Captured 09_contact_1440.png")

        # 11. Mobile Breakpoint 390x844
        driver.set_window_size(390, 844)
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(0.5)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "10_mobile_hero_390.png"))
        print("Captured 10_mobile_hero_390.png")

        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", owner_sec)
        time.sleep(0.5)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "11_mobile_about_390.png"))
        print("Captured 11_mobile_about_390.png")

        driver.execute_script("arguments[0].scrollIntoView({behavior: 'instant'});", garage_sec)
        time.sleep(0.5)
        driver.save_screenshot(os.path.join(SCREENSHOT_DIR, "12_mobile_garage_390.png"))
        print("Captured 12_mobile_garage_390.png")

        # 12. Check browser console logs
        print("\n--- BROWSER CONSOLE LOGS ---")
        logs = driver.get_log("browser")
        error_count = 0
        for entry in logs:
            if entry.get("level") in ("SEVERE", "WARNING"):
                print(f"[{entry['level']}] {entry['message']}")
                if entry.get("level") == "SEVERE":
                    error_count += 1
            else:
                print(f"[{entry.get('level', 'INFO')}] {entry['message']}")

        if error_count == 0:
            print("Zero SEVERE browser console errors!")
        else:
            print(f"Found {error_count} SEVERE browser console errors!")

    finally:
        driver.quit()

if __name__ == "__main__":
    run_tests()
