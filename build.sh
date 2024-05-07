find ./packages -type d -name "dist" -exec rm -r {} +
find ./packages -name "*.tsbuildinfo" -type f -delete

echo "@compyto/validation"
yarn workspace @compyto/validation build

echo "@compyto/core"
yarn workspace @compyto/core build

echo "@compyto/utils"
yarn workspace @compyto/utils build

echo "@compyto/connections"
yarn workspace @compyto/connections build

echo "@compyto/balancing"
yarn workspace @compyto/balancing build

echo "@compyto/settings"
yarn workspace @compyto/settings build

echo "@compyto/monitoring"
yarn workspace @compyto/monitoring build

echo "@compyto/logging"
yarn workspace @compyto/logging build

echo "@compyto/runtime"
yarn workspace @compyto/runtime build

echo "@compyto/sockets"
yarn workspace @compyto/sockets build

echo "@compyto/serialization"
yarn workspace @compyto/serialization build

echo "@compyto/runner"
yarn workspace @compyto/runner build

echo "@compyto/dashboard"
yarn workspace @compyto/dashboard build
