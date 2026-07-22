%TOOL%\PHYX\phyx --newline --include "ADMIN/src//*.js" --include "ADMIN/src//*.ts" --include "CLIENT/src//*.js" --include "CLIENT/src//*.ts" --include "SITE/src//*.js" --include "SITE/src//*.ts"
%TOOL%\PHYX\phyx --newline --media --style --include "ADMIN/src//*.svelte" --include "ADMIN/src//*.styl" --include "CLIENT/src//*.svelte" --include "CLIENT/src//*.styl" --include "SITE/src//*.svelte" --include "SITE/src//*.styl"
%TOOL%\FLEX\flex fix.flex
pause
