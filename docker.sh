docker-compose down
docker-compose up -d elasticsearch
sleep 5
docker-compose up -d jaeger
sleep 5
docker-compose up -d
