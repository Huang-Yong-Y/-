#!/bin/bash


dir=`dirname $0`
#export dir=`cd $dir/frontend; pwd`

export time=`date +"%Y%m%d%H%M%S"`

PROFILE=":test"



env="$1"
echo "env: $env"

while [ $# -gt 0 ]; do
    case "$env" in
        --prod)
            PROFILE=":prod"
            shift
            ;;
        --test)
            PROFILE=":test"
            shift
            ;;
        --dev)
            PROFILE=""
            shift
            ;;
        *)
            break
            ;;
    esac
done

echo "CMD= npm run build$PROFILE"

function compile() {
#    cd $dir
    echo "npm install ..."
#    npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc install
    npm --cache=$HOME/.npm/.cache/npm install
    echo "npm run build$PROFILE"
    npm run build
    if [ $? -ne 0 ]; then
        echo "Compile error!" 1>&2
        exit 1
    fi
}

function main() {
    compile
    echo "Done!"
}

main

exit 0
