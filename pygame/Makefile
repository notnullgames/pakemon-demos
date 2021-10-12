help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

setup: ## setup dependencies
	pip3 install -r requirements.txt

run: ## run local copy of app
	python3 main.py

package: ## create a pre-compiled version of app
	pyinstaller main.py
