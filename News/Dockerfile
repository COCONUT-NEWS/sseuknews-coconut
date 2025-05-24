# News/Dockerfile

FROM python:3.13-slim

RUN apt-get update && apt-get install -y \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

ARG DB_HOST_NEWS
ARG DB_USER_NEWS
ARG DB_PASSWORD_NEWS
ARG DB_NAME_NEWS

ENV DB_HOST_NEWS=$DB_HOST_NEWS
ENV DB_USER_NEWS=$DB_USER_NEWS
ENV DB_PASSWORD_NEWS=$DB_PASSWORD_NEWS
ENV DB_NAME_NEWS=$DB_NAME_NEWS

WORKDIR /app
COPY . /app/

COPY .env /app/.env


RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "Crawling.py"]
