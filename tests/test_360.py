import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

options = Options()
options.add_argument('--headless=new')
options.add_argument('--window-size=360,740')
driver = webdriver.Chrome(options=options)

try:
    driver.get('http://localhost:4173/kabeer-portfolio/')
    time.sleep(1)
    driver.save_screenshot('tests/screenshots/15_small_mobile_intro_360.png')
    skip_btn = driver.find_element(By.XPATH, "//button[contains(., 'Skip Intro')]")
    skip_btn.click()
    time.sleep(1.5)
    driver.save_screenshot('tests/screenshots/16_small_mobile_hero_360.png')
    print('Captured 360px screenshots')
finally:
    driver.quit()
