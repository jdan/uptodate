.PHONY:

test: .PHONY
	@./node_modules/.bin/jslint uptodate.js
	@echo "\nThanks for testing! ~jordan\n"
