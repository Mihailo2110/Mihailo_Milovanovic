FROM python:3.6
ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

WORKDIR /

ADD requirements.txt /

RUN pip install --no-cache-dir -r requirements.txt

ADD app /app
ADD run_server.sh /

EXPOSE 8080