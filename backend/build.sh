clear() {
  find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
  find . -path "*/migrations/*.pyc" -delete
}

migrate() {
  poetry run python manage.py makemigrations
  poetry run python manage.py migrate
}

start() {
  poetry run python manage.py runserver
}

create_super_user() {
  poetry run python manage.py createsuperuser
}

db_init() {
  poetry run python manage.py insert_init_languages
}

gen_req() {
  poetry export --without-hashes --format=requirements.txt > requirements.txt
}

docker_build() {
  gen_req
  docker stop grind-hub-backend
  docker rm grind-hub-backend
  docker build -t web:latest .
  docker run -d --name grind-hub-backend -e "PORT=8765" -e "DEBUG=1" -p 8007:8765 web:latest
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
  docker_build)
    docker_build
    ;;
  gen_req)
    gen_req
    ;;
  *)
    echo "Usage: $0 {clear|migrate|start|create_super_user|db_init|docker_build|gen_req}"
    exit 1
esac
