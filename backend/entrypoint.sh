#!/bin/bash

case "$1" in
backend)
    echo "Running backend"
    node dist/server.js
    ;;
schedule)
    echo "Crontab"
    printenv | sed -e 's/^/export /g' > /env.sh
    chmod +x /env.sh
    DIR=$(pwd)
    echo "0 * * * * . /env.sh; cd $DIR; node dist/tasks/sync.js > /tmp/status.log" > $DIR/crontab
    crontab $DIR/crontab
    cron -f
    ;;
sync)
    echo "Sync process"
    node dist/tasks/sync.js
    ;;
*)
    echo "$@"
    $@
    ;;
esac