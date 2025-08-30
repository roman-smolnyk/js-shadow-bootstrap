#!/usr/bin/env bash
git push origin main
git push origin_github main

git tag -a v0.1.5 -m "v0.1.5"
git push origin v0.1.5
git push origin_github v0.1.5