if [ $1 == "umrzyj" ]
then
docker-compose up --force-recreate --build
else
docker-compose down
fi

docker-compose up -d elasticsearch
sleep 5

docker-compose up -d jaeger
echo "running jaeger at http://localhost:16686"

docker-compose up -d kibana
echo "running kibana at http://localhost:5601"

docker-compose up -d grafana
echo "running grafana at http://localhost:3000"

docker-compose up -d prometheus
echo "running prometheus at http://localhost:9090"

docker-compose up -d