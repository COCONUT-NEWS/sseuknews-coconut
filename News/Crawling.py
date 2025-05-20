import requests
from bs4 import BeautifulSoup
import datetime, time
import pymysql

# ✅ 로컬/배포 환경 구분
try:
    from config_local import DB_CONFIG
except ImportError:
    from config import DB_CONFIG

yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%Y%m%d')

categories = {
    "politics": "100",
    "economy": "101",
    "society": "102",
    "culture": "103",
    "technology": "105",
    "world": "104"
}

headers = {"User-Agent": "Mozilla/5.0"}
all_news = []

for name, sid in categories.items():
    print(f"\n📦 카테고리: {name}")
    page = 1
    count = 0  # ✅ 카테고리별 수집 개수

    while count < 100:
        url = f"https://news.naver.com/main/list.naver?mode=LSD&mid=shm&sid1={sid}&date={yesterday}&page={page}"
        try:
            res = requests.get(url, headers=headers)
            res.encoding = 'euc-kr'
            soup = BeautifulSoup(res.text, "html.parser")
        except Exception as e:
            print(f"❌ 요청 실패: {e}")
            break

        items = soup.select("ul.type06_headline li dl dt:not(.photo) a")
        if not items:
            break

        for tag in items:
            if count >= 100:
                break

            try:
                news_url = tag["href"]
                title = tag.get_text(strip=True)

                detail_res = requests.get(news_url, headers=headers)
                detail_res.encoding = 'utf-8'
                detail_soup = BeautifulSoup(detail_res.text, "html.parser")

                content_tag = detail_soup.select_one("div#newsct_article")
                content = content_tag.get_text(strip=True) if content_tag else ""

                if not content:
                    continue

                all_news.append((name, title, news_url, content))
                print(f"✅ {title}")
                count += 1
                time.sleep(0.1)
            except Exception as e:
                print(f"❌ 파싱 실패: {e}")
                continue

        page += 1

print(f"\n🧾 전체 수집 완료: {len(all_news)}개 뉴스 수집됨.")

def save_to_mysql(news_data):
    if not news_data:
        print("⚠️ 저장할 뉴스 없음.")
        return

    try:
        conn = pymysql.connect(**DB_CONFIG)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category VARCHAR(50),
                title TEXT,
                url TEXT,
                content LONGTEXT,
                crawled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        sql = "INSERT INTO news (category, title, url, content) VALUES (%s, %s, %s, %s)"
        cursor.executemany(sql, news_data)
        conn.commit()
        print(f"✅ DB 저장 완료: {len(news_data)}건")
    except Exception as e:
        print(f"❌ DB 저장 실패: {e}")
    finally:
        cursor.close()
        conn.close()

save_to_mysql(all_news)
