HEROKU_PROJ=hidden-dusk-88069
CONTAINER_NAME=grind-hub-backend

clear() {
  find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
  find . -path "*/migrations/*.pyc" -delete
}

migrate() {
  poetry run python manage.py makemigrations
  poetry run python manage.py migrate
}

collectstatic() {
  poetry run python manage.py collectstatic
}

dev() {
  stop
  poetry add $(cat requirements.txt)
  poetry run python manage.py runserver
}

create_super_user() {
  poetry run python manage.py createsuperuser
}

dev_db_init() {
  poetry run python manage.py insert_init_languages
}

db_init() {
  heroku run python manage.py insert_init_languages
}

gen_req() {
  poetry export --without-hashes --format=requirements.txt > requirements.txt
}

deploy() {
  gen_req
  cd .. && git subtree push --prefix backend heroku main
  heroku run python manage.py makemigrations -a hidden-dusk-88069
  heroku run python manage.py migrate -a ${HEROKU_PROJ}
}

stop() {
  docker stop ${CONTAINER_NAME}
  docker rm ${CONTAINER_NAME}
}


start() {
  stop
  docker image rm web
  docker build -t web:latest .
  docker run -d --name ${CONTAINER_NAME} -e "PORT=8765" -e "DEBUG=1" -p 8000:8765 web:latest
}

case "$1" in
  clear)
    clear
    ;;
  migrate)
    migrate
    ;;
  start)
    start
    ;;
  create_super_user)
    create_super_user
    ;;
  db_init)
    db_init
    ;;
  dev_db_init)
    dev_db_init
    ;;
  dev)
    dev
    ;;
  gen_req)
    gen_req
    ;;
  stop)
    stop
    ;;
  deploy)
    deploy
    ;;
  collectstatic)
    collectstatic
    ;;
  *)
    echo "Usage: $0 {clear|migrate|start|create_super_user|dev_db_init|db_init|docker_build|gen_req|collectstatic}"
    exit 1
esac
