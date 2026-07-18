.PHONY: install build typecheck test lint format ci

RUNTIME_DIR := apps/runtime

install:
	cd $(RUNTIME_DIR) && npm install

build:
	cd $(RUNTIME_DIR) && npm run build

typecheck:
	cd $(RUNTIME_DIR) && npm run typecheck

test:
	cd $(RUNTIME_DIR) && npm test

lint:
	cd $(RUNTIME_DIR) && npm run lint

format:
	cd $(RUNTIME_DIR) && npm run format:check

ci: install typecheck lint test build