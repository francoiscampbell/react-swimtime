TSC=node_modules/.bin/tsc

.PHONY: clean
clean:
	rm -rf dist

.PHONY: build
build: node_modules
	$(TSC)

clean_build: clean build

.PHONY: watch
watch:
	$(TSC) -w

.PHONY: publish
publish:
	yarn publish

node_modules:
	yarn