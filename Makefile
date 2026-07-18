.PHONY: install build typecheck test lint format ci

install:
	cd apps/runtime && npm install

build:
	cd apps/runtime && npm run build

typecheck:
	cd apps/runtime && npm run build

test:
	@echo "No tests configured yet"

lint:
	@echo "No lint configured yet"

format:
	@echo "No formatter configured yet"

ci: typecheck lint test build