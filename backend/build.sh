clear() {
  find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
  find . -path "*/migrations/*.pyc" -delete
}

migrate() {
  python manage.py makemigrations
  python manage.py migrate
}

start() {
  python manage.py runserver
}

create_super_user() {
  python manage.py createsuperuser
}

db_init() {
  python manage.py insert_init_languages
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
  *)
    echo "Usage: $0 {clear|migrate|start|create_super_user|db_init}"
    exit 1
esac
