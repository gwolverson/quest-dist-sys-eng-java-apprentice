cd $HOME
git config --global user.email "travis@travis.com"
git config --global user.name "Travis CI"

git status
git remote rm origin
git remote add origin https://andrewharmellaw:$GITHUB_API_KEY@github.com/andrewharmellaw/quest-dist-sys-eng-java-apprentice.git
git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed [skip ci]"
git status
git push -fq origin master > /dev/null
git s
echo -e "Done\n"
