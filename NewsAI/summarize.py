# NewsAI/summarize.py

import boto3
import json
import os
import re

from config import AWS_REGION

def clean_summary_text(summary):
    lines = summary.splitlines()
    cleaned = [re.sub(r'^\d+\.\s*', '', line).strip() for line in lines if line.strip()]
    return '\n'.join(cleaned)

def summarize_with_bedrock(news_content):
    client = boto3.client(
        service_name="bedrock-runtime",
        region_name=AWS_REGION,
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
    )

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
        modelId="anthropic.claude-3-haiku-20240307-v1:0",
        contentType="application/json",
        accept="application/json",
        body=json.dumps(body)
    )

    result = json.loads(response["body"].read())
    raw_summary = result["content"][0]["text"].strip()
    return clean_summary_text(raw_summary)

