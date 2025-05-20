# app.py 

from flask import Flask, jsonify
from Crawling import run_crawling

app = Flask(__name__)

@app.route('/crawl', methods=['GET'])
def crawl_news():
    run_crawling()
    return jsonify({"message": "크롤링 및 저장 완료"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
