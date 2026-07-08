#!/bin/sh
set -e

if command -v dbus-launch >/dev/null 2>&1 && [ -z "${DBUS_SESSION_BUS_ADDRESS:-}" ]; then
  eval "$(dbus-launch --sh-syntax --exit-with-session)"
  export DBUS_SESSION_BUS_ADDRESS
fi

exec node dist/main
