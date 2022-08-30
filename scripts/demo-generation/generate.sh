set -e
for i in {1..6}
do
	node replace.js demo-$i
	cd ../../
	yarn build
	mv build demo-$i
	zip -r demo-$i.zip demo-$i
	rm -rf demo-$i
  cd scripts/demo-generation
  node reset.js
done
