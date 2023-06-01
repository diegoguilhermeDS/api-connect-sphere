#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
yarn build
yarn prisma migrate dev