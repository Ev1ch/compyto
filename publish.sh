for package in ./packages/*; do
  PACKAGE_VERSION="$(node -p -e "require('$package/package.json').version")"
  PACKAGE_NAME="$(node -p -e "require('$package/package.json').name")"
  FOUND_VERSION=$(npm view $PACKAGE_NAME versions | grep -w \'$PACKAGE_VERSION\')

  if ! $FOUND_VERSION; then
    IS_NEW_VERSION=true
  fi

  if $IS_NEW_VERSION; then
    echo "Publishing $PACKAGE_NAME@$PACKAGE_VERSION"
    yarn workspace $PACKAGE_NAME build
    yarn workspace $PACKAGE_NAME publish
  else
    echo "Skipping $PACKAGE_NAME@$PACKAGE_VERSION"
  fi
done
