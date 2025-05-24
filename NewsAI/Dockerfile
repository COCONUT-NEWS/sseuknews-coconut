# Dockerfile

FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY .env .env 

RUN echo "✅ .env content:" && cat .env

CMD ["python", "app.py"]
