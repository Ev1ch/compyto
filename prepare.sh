for package in ./packages/*; do
  PACKAGE_FILE_CONTENT="$(node -p -e "const package = require('$package/package.json'); delete package.scripts; delete package.devDependencies; JSON.stringify(package, null, 2)")"

  echo "$PACKAGE_FILE_CONTENT" >"$package/package.json"
done
