#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  cd $TRAVIS_BUILD_DIR
  git config --global user.email "travis@travis.com"
  git config --global user.name "Travis CI"
  git remote rm origin
  git remote add origin https://andrewharmellaw:$GITHUB_API_KEY@github.com/andrewharmellaw/quest-dist-sys-eng-java-apprentice.git
  git remote -v
  git checkout master
  touch .
  git add -A .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed [skip ci]"
  git push origin master
  echo -e "Done\n"
fi
