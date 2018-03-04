.PHONY: clean
clean:
	rm -rf dist

.PHONY: build
build: node_modules
	node_modules/.bin/tsc

clean_build: clean build

.PHONY: publish
publish:
	yarn publish

node_modules:
	yarn