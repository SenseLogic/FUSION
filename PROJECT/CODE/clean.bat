call yarn cache clean
del /q ADMIN\package-lock.json
del /q CLIENT\package-lock.json
del /q SITE\package-lock.json
del /q ADMIN\yarn.lock
del /q CLIENT\yarn.lock
del /q SITE\yarn.lock
rmdir /s /q ADMIN\dist
rmdir /s /q CLIENT\dist
rmdir /s /q SITE\build
rmdir /s /q SITE\.svelte-kit
rmdir /s /q ADMIN\node_modules
rmdir /s /q CLIENT\node_modules
rmdir /s /q SITE\node_modules
pause
