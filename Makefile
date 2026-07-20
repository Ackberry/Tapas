.PHONY: install build typecheck test lint format fix ci

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
fix:
	cd $(RUNTIME_DIR) && npm run format

ci: install typecheck lint test format build
