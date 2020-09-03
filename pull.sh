git reset --hard
git pull origin develop
docker-compose down
docker rmi zmist_zmist
docker-compose up -d --build --force-recreate --no-deps
