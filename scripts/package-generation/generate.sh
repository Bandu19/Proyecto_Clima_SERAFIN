node generate-package.js

cd ../../../full-version

yarn

yarn format

rm -rf node_modules

cd ../

echo $PWD

zip -r full-version.zip full-version

wait

rm -rf full-version

wait

cd vuexy-react-template/scripts/starter-kit-generation

sh generate.sh

wait

cd ../../../vuexy-react-starter-kit

rm -rf node_modules

wait

cd ../

wait

zip -r starter-kit.zip vuexy-react-starter-kit
