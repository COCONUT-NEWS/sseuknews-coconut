# News/Dockerfile

FROM python:3.13-slim

RUN apt-get update && apt-get install -y \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /app

COPY . /app/
COPY .env .env 

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "Crawling.py"]
