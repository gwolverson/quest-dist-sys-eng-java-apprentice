#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  cd $HOME
  git config --global user.email "travis@travis.com"
  git config --global user.name "Travis CI"
  touch .
  git add -A .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed [skip ci]"
  git push origin master
  echo -e "Done\n"
fi
