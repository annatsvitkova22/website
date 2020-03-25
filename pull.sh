. /zmist/.nvm/nvm.sh
nvm use
git reset --hard
git pull origin development
rm -rf node_modules/ yarn.lock build/
yarn install
npm rebuild
yarn build
pm2 restart nextjs
