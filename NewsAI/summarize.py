import boto3
import json
import os
import sys
import re

# config 경로 설정
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../config')))
from config import AWS_REGION, AWS_PROFILE

def clean_summary_text(summary):
    import re
    lines = summary.splitlines()
    cleaned = [re.sub(r'^\d+\.\s*', '', line).strip() for line in lines if line.strip()]
    return '\n'.join(cleaned) 


def summarize_with_bedrock(news_content):
    session = boto3.Session(profile_name=AWS_PROFILE, region_name=AWS_REGION)
    client = session.client(service_name="bedrock-runtime")

    body = {
        "anthropic_version": "bedrock-2023-05-31",
        "messages": [
            {
                "role": "user",
                "content": f"다음 뉴스 기사를 읽고 핵심 내용을 자연스럽게 5문장으로 요약해줘. 숫자 없이 문장으로:\n\n{news_content}"
            }
        ],
        "max_tokens": 300,
        "temperature": 0.5
    }

    response = client.invoke_model(
        modelId="anthropic.claude-3-haiku-20240307-v1:0",  # 도쿄 리전 기준
        contentType="application/json",
        accept="application/json",
        body=json.dumps(body)
    )

    result = json.loads(response["body"].read())
    raw_summary = result["content"][0]["text"].strip()
    return clean_summary_text(raw_summary)
