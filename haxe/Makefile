.PHONY: help clean setup web native site server

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

clean: ## Delete built files
	rm -rf export

setup: ## Install all dependencies (other than haxe)
	haxelib install lime
	haxelib install openfl
	haxelib install flixel
	haxelib install flixel-addons
	haxelib install colyseus-websocket
	haxelib run lime setup flixel
	haxelib run lime setup
	haxelib install flixel-tools
	haxelib run flixel-tools setup

web: ## Run web version of pakemon, locally
	lime test html5

neko: ## Run native version of pakemon, locally
	lime test neko

site: ## Deploy demo site
	lime build html5
	npx surge ./export/html5/bin/ pakemon-haxe.surge.sh

server: ## Run socket server for testing (with nodejs)
	cd server && npm i && npm start
