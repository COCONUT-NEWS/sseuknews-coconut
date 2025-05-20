import requests

url = "https://news.naver.com/main/ranking/popularDay.naver?sectionId=100"
headers = {"User-Agent": "Mozilla/5.0"}
res = requests.get(url, headers=headers)
res.encoding = "euc-kr"

with open("naver_live_test.html", "w", encoding="euc-kr") as f:
    f.write(res.text)

print("✅ 저장 완료: naver_live_test.html")


