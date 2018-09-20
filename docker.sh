docker-compose down

docker-compose up -d elasticsearch
sleep 5

docker-compose up -d jaeger
echo "running jaeger at http://localhost:16686"
sleep 5

docker-compose up -d kibana
echo "running kibana at http://localhost:5601"
sleep 5

docker-compose up -d
