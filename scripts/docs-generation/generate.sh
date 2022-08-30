cd ../../docs

yarn build

wait

mv build ../documentation

cd ../

zip -r documentation.zip documentation

rm -rf documentation
