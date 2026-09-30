#!/usr/bin/env bash
set -euo pipefail

# Builds every tool in tools/ into build/tools/.
# Convention:
#   tools/<name>/        source (committed to git)
#   build/tools/<name>/  built static output (gitignored, deployed)
#
# Two kinds of tools:
#   - Build tools (package.json with a "build" script): each tool emits to its
#     own build/tools/<name> folder (e.g. via Vite's build.outDir). This script
#     just installs dependencies and runs the build.
#   - Static tools (no build script): source is copied straight to
#     build/tools/<name>.
#
# Usage:
#   ./build-tools.sh              # build all tools
#   ./build-tools.sh code         # build one tool

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLS_DIR="$SCRIPT_DIR/tools"
BUILD_DIR="$SCRIPT_DIR/build/tools"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

pass=0
fail=0
skip=0

if [[ ! -d "$TOOLS_DIR" ]]; then
  echo "Error: tools directory not found at '$TOOLS_DIR'" >&2
  exit 1
fi

mkdir -p "$BUILD_DIR"

# Optional filter: ./build-tools.sh <tool-name>
filter="${1:-}"

echo -e "\n🧰 Starting tools build...\n"

for tool_path in "$TOOLS_DIR"/*/; do
  [[ -d "$tool_path" ]] || continue
  tool_name="$(basename "$tool_path")"

  # Shared source (imported by tools, not a tool itself): never build or copy.
  if [[ "$tool_name" == "shared" ]]; then
    continue
  fi

  if [[ -n "$filter" && "$tool_name" != "$filter" ]]; then
    continue
  fi

  out_dir="$BUILD_DIR/$tool_name"

  # Static tool (no build step): copy source straight to the deploy folder.
  if [[ ! -f "$tool_path/package.json" ]] || ! node -e "process.exit(require('$tool_path/package.json').scripts?.build ? 0 : 1)" 2>/dev/null; then
    echo -e "📋 Copying static tool '$tool_name'..."
    rm -rf "$out_dir"
    mkdir -p "$out_dir"
    (cd "$tool_path" && tar cf - --exclude=.git --exclude=node_modules --exclude=dist .) | (cd "$out_dir" && tar xf -) && {
      echo -e "${GREEN}✔  '$tool_name' → build/tools/$tool_name${NC}"
      (( pass++ )) || true
    } || {
      echo -e "${RED}✖  '$tool_name' — copy failed${NC}"
      (( fail++ )) || true
    }
    continue
  fi

  echo -e "🔨 Building tool '$tool_name'..."

  # Install dependencies if node_modules is missing
  if [[ ! -d "$tool_path/node_modules" ]]; then
    echo -e "   Installing dependencies..."
    (cd "$tool_path" && npm ci) || {
      echo -e "${RED}✖  '$tool_name' — npm ci failed${NC}"
      (( fail++ )) || true
      continue
    }
  fi

  if (cd "$tool_path" && npm run build); then
    echo -e "${GREEN}✔  '$tool_name' → build/tools/$tool_name${NC}"
    (( pass++ )) || true
  else
    echo -e "${RED}✖  '$tool_name' — build failed${NC}"
    (( fail++ )) || true
  fi
done

if [[ -n "$filter" && $((pass + fail + skip)) -eq 0 ]]; then
  echo -e "${RED}✖  No tool named '$filter' found in tools/${NC}" >&2
  exit 1
fi

echo -e "\n─────────────────────────────────"
echo -e "  Built:   ${GREEN}$pass${NC}"
[[ $skip -gt 0 ]] && echo -e "  Skipped: ${YELLOW}$skip${NC}"
[[ $fail -gt 0 ]] && echo -e "  Failed:  ${RED}$fail${NC}"
echo -e "─────────────────────────────────\n"

[[ $fail -gt 0 ]] && exit 1
exit 0
