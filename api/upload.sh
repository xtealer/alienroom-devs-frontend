BUILD_URL = "./build/alienroom"

mkdir build
mkdir alienroom
mv ./alienroom $BUILD_URL/

cp -r ./src $BUILD_URL/src
cp ./docker-compose.yml $BUILD_URL/
cp ./package.json $BUILD_URL/

scp -r ./build/* xtealer@35.225.168.243:~/
cat ./deploy.sh | ssh xtealer@35.225.168.243:~/alienroom
