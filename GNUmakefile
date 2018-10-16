########################################
#          FRONTEND MAKEFILE           #
#        Author: Aurelien PERRIER      #
########################################

TAGS=latest 0.0.6
TAG_RUN=latest
IMAGE=quay.io/needpc/needpc-frontend

all: build run test stop clean

push:
	@echo "Push image in registry ..."
	@$(foreach TAG,$(TAGS), docker push $(IMAGE):$(TAG);)

run:
	@echo "Start new container ..."
	@docker run -d -p 80:80 $(IMAGE):$(TAG_RUN)

stop:
	@echo "Stop container ..."
	@docker stop `docker ps -q`
	
build:
	@if [ ! -d "node_modules" ]; then npm i; fi
	@echo "Build UI ..."
	@if [ -d "dist" ]; then rm -rf dist; fi
	@./node_modules/.bin/ng build
	@echo "Build Docker image ..."
	@$(foreach TAG,$(TAGS), docker build . -t $(IMAGE):$(TAG);)

test:
	@echo "Test app ..."
	@curl -I --silent --show-error --fail http://localhost
	
clean: 
	@echo "Delete Angular Website ..."
	@rm -rf ./dist ./node_modules
	@echo "Delete Image Docker ..."
	@$(foreach TAG,$(TAGS), docker rmi $(IMAGE):$(TAG) -f;)

.PHONY: help push run-$(TAGS) build clean