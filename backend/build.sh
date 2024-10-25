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
  *)
    echo "Usage: $0 {connect|connect_db|clear|gcp_init|migrate|start|run|backup|first_deploy|deploy}"
    exit 1
esac
