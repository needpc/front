ng build
sudo docker build -t quay.io/needpc/needpc-frontend .
sudo docker stop $(sudo docker ps -q --quiet)
sudo docker run -d -p 80:80 quay.io/needpc/needpc-frontend
