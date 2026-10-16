import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

options = Options()
options.add_argument('--headless=new')
options.add_argument('--window-size=390,844')
driver = webdriver.Chrome(options=options)

try:
    driver.get('http://localhost:4173/kabeer-portfolio/')
    time.sleep(1)
    driver.find_element(By.XPATH, "//button[contains(., 'Skip Intro')]").click()
    time.sleep(1.5)
    hamburger = driver.find_element(By.XPATH, "//button[@aria-label='Open menu']")
    print('Clicking hamburger...')
    hamburger.click()
    time.sleep(1)
    driver.save_screenshot('tests/screenshots/13_mobile_menu_open_390.png')
    print('Captured 13_mobile_menu_open_390.png')

    # Click a link inside mobile menu
    garage_link = driver.find_element(By.XPATH, "//div[@id='mobile-menu']//a[contains(., 'GARAGE')]")
    garage_link.click()
    time.sleep(1)
    driver.save_screenshot('tests/screenshots/14_mobile_menu_clicked_garage_390.png')
    print('Captured 14_mobile_menu_clicked_garage_390.png')
finally:
    driver.quit()
