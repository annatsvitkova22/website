. /home/zmist/.nvm/nvm.sh
nvm use
git reset --hard
git pull origin development
yarn install
npm rebuild
yarn build
pm2 restart nextjs
