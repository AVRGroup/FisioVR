#!/bin/bash

branch=$(git rev-parse --abbrev-ref HEAD)
gh='gh-pages'

if [[ $branch == $gh ]]; then
    echo "ERROR: Current branch is $gh"
    exit
fi

npm run build

if [[ ! -d "dist" ]]; then
    echo "ERRO: dist/ not found"
    exit
fi

cp -r dist /tmp

if git checkout $gh; then
    cp /tmp/dist/* .
else
    echo "ERROR: checkout failed"
    exit
fi

if [[ ! $(git status --porcelain) ]]; then
    echo "No changes to commit"
else
    timestamp="$(date +%Y-%m-%d-%T)"
    git add .
    git commit -m "$timestamp"
    git push
fi

git checkout $branch
