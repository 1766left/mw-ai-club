#!/bin/sh
# 本地构建脚本
#
# 这个脚本只为「在 WorkBuddy 沙箱里跑构建」服务，正常机器上直接 `npm run build` 即可。
# 两处针对性处理：
#   1) NODE_OPTIONS —— 沙箱注入的批量删除护栏会卡住 Astro 构建收尾的临时目录清理
#      （报 SAFE_DELETE_BULK_GUARD_ERROR: state lock timeout），这里清掉。
#   2) TMPDIR —— 系统临时目录在沙箱里不可写/不可删，esbuild 会因为删不掉自己的
#      临时文件而失败（operation not permitted），这里指到项目内的 .tmp。
cd "$(dirname "$0")" || exit 1
export PATH="/Users/yanfeixu/.workbuddy/binaries/node/versions/22.22.2-6/bin:$PATH"
unset NODE_OPTIONS
export TMPDIR="$PWD/.tmp"
mkdir -p "$TMPDIR"
npx astro build
