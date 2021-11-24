## test: Test golang sources code
test:
	go test ./... -coverprofile=coverage.cov

## install: Install module requirement applications
install:
	go mod tidy

build:
	echo "machine $(BUILD_MACHINE) login $(BUILD_USER) password $(ACCESS_TOKEN)" > ~/.netrc
	export GIT_TERMINAL_PROMPT=1
	docker build --no-cache --build-arg BUILD_MACHINE=$(BUILD_MACHINE) --build-arg BUILD_USER=$(BUILD_USER) --build-arg BUILD_TOKEN=$(ACCESS_TOKEN) -t harbor.linkaja.com/lab/$(CI_PROJECT_NAME):$(CURRENT_COMMIT)  .
	docker login -u $(DOCKER_USERNAME) -p $(DOCKER_PASSWORD) harbor.linkaja.com
	docker push harbor.linkaja.com/lab/$(CI_PROJECT_NAME):$(CURRENT_COMMIT)
	docker rmi harbor.linkaja.com/lab/$(CI_PROJECT_NAME):$(CURRENT_COMMIT)


deploy:
	@if [ $(CI_ENVIRONMENT_NAME) = "production" ]; then \
	kubectl config set-cluster k8s-prod-istio --server="$(KUBE_ISTIO_ENDPOINT)"; \
	kubectl config set-context default-context --cluster=k8s-prod-istio --user="$(K8S_USER)"; \
	kubectl config set clusters.k8s-prod-istio.certificate-authority-data $(KUBE_ISTIO_CA_CRT) --set-raw-bytes=false; \
	elif [ $(CI_ENVIRONMENT_NAME) = "development" ]; then \
	kubectl config set-cluster k8s-dev-istio --server="$(KUBE_ISTIO_ENDPOINT)"; \
	kubectl config set-context default-context --cluster=k8s-dev-istio --user="$(K8S_USER)"; \
	kubectl config set clusters.k8s-dev-istio.certificate-authority-data $(KUBE_ISTIO_CA_CRT) --set-raw-bytes=false; \
  else \
	echo "false"; \
	fi
	git clone http://$(GIT_USER):$(ACCESS_TOKEN)@gitlab.linkaja.com/automation/helm-chart.git
	kubectl config set-credentials $(K8S_USER) --token="$(K8S_ISTIO_TOKEN)"
	kubectl config use-context default-context
	@if [ $(CI_ENVIRONMENT_NAME) = "production" ]; then \
	helm upgrade $(CI_PROJECT_NAME) ./helm-chart/istio-ingress-services-v2/ -f values.production.yaml   --set image.repository=harbor.linkaja.com/lab/$(CI_PROJECT_NAME) --set image.tag=$(CURRENT_COMMIT) -n $(NAMESPACE) -i --create-namespace --atomic --timeout 1m --debug ; \
	elif [ $(CI_ENVIRONMENT_NAME) = "development" ]; then \
  if [ $(SUB_ENV) = "uat" ]; then \
	helm upgrade $(CI_PROJECT_NAME) ./helm-chart/istio-ingress-services-v2/ -f values.uat.yaml   --set image.repository=harbor.linkaja.com/lab/$(CI_PROJECT_NAME) --set image.tag=$(CURRENT_COMMIT) -n $(NAMESPACE) -i --create-namespace --timeout 1m --debug ; \
	elif [ $(SUB_ENV) = "uat-two" ]; then \
	helm upgrade $(CI_PROJECT_NAME) ./helm-chart/istio-ingress-services-v2/ -f values.uat-two.yaml   --set image.repository=harbor.linkaja.com/lab/$(CI_PROJECT_NAME) --set image.tag=$(CURRENT_COMMIT) -n $(NAMESPACE) -i --create-namespace --timeout 1m --debug ; \
	elif [ $(SUB_ENV) = "uat-three" ]; then \
	helm upgrade $(CI_PROJECT_NAME) ./helm-chart/istio-ingress-services-v2/ -f values.uat-three.yaml   --set image.repository=harbor.linkaja.com/lab/$(CI_PROJECT_NAME) --set image.tag=$(CURRENT_COMMIT) -n $(NAMESPACE) -i --create-namespace --timeout 1m --debug ; \
  else \
	helm upgrade $(CI_PROJECT_NAME) ./helm-chart/istio-ingress-services-v2/ -f values.development.yaml   --set image.repository=harbor.linkaja.com/lab/$(CI_PROJECT_NAME) --set image.tag=$(CURRENT_COMMIT) -n $(NAMESPACE) -i --create-namespace --timeout 1m --debug ; \
  fi; \
  else \
	echo "false"; \
	fi;
	kubectl get po -n cms | grep $(CI_PROJECT_NAME)

.PHONY: help
all: help
help: Makefile
	@echo
	@echo " Choose a command run with parameter options: "
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
