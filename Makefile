SHELL = /bin/bash
APP_DIR = docs

fmt-check:
	npx prettier --single-quote -c "$(APP_DIR)/**/*.{css,js}"

fmt:
	npx prettier --single-quote -w "$(APP_DIR)/**/*.{css,js}"

s serve:
	npx serve $(APP_DIR)
