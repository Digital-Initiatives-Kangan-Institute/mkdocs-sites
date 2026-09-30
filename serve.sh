#!/bin/bash

SITES_DIR="./sites"
BUILD_DIR="./build"
DEFAULT_PORT=8000

# ── Colours ───────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

# ── Header ────────────────────────────────────
echo -e "\n${BOLD}${CYAN}╔══════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${CYAN}║         MkDocs Site Server           ║${RESET}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════╝${RESET}\n"

# ── Check sites directory exists ──────────────
if [ ! -d "$SITES_DIR" ]; then
  echo -e "${RED}✖  '$SITES_DIR' directory not found.${RESET}"
  exit 1
fi

# ── Portal or single site? ────────────────────
echo -e "${BOLD}What do you want to serve?${RESET}\n"
echo -e "  ${CYAN}1)${RESET} Portal (production-like)"
echo -e "  ${CYAN}2)${RESET} Individual site (with live reload)"
echo ""
read -rp "$(echo -e "${BOLD}Enter number [1-2]:${RESET} ")" mode

if ! [[ "$mode" =~ ^[1-2]$ ]]; then
  echo -e "\n${RED}✖  Invalid selection.${RESET}"
  exit 1
fi

# ── Resolve port ──────────────────────────────
echo ""
read -rp "$(echo -e "${BOLD}Enter port [default: ${DEFAULT_PORT}]:${RESET} ")" port_input
PORT="${port_input:-$DEFAULT_PORT}"
if ! [[ "$PORT" =~ ^[0-9]+$ ]] || [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ]; then
  echo -e "${RED}✖  Invalid port '$PORT'. Must be a number between 1 and 65535.${RESET}"
  exit 1
fi

# ── Portal (production-like, no live reload) ──
if [ "$mode" -eq 1 ]; then
  echo -e "\n${YELLOW}Note: the portal is served the same way it is in production"
  echo -e "(fully built static files, including tools) — there is no live"
  echo -e "reloading. Re-run this script to pick up changes.${RESET}\n"

  echo -e "Building all sites and tools (this may take a while)...\n"
  if ! ./build.sh; then
    echo -e "\n${RED}✖  Build failed — not serving.${RESET}"
    exit 1
  fi

  echo -e "\n${GREEN}✔  Serving portal at http://127.0.0.1:${PORT}${RESET}\n"
  cd "$BUILD_DIR" || exit 1
  python3 -m http.server "$PORT" --bind 127.0.0.1
  exit 0
fi

# ── Pick a site ───────────────────────────────
sites=()
while IFS= read -r -d '' dir; do
  sites+=("$(basename "$dir")")
done < <(find "$SITES_DIR" -mindepth 1 -maxdepth 1 -type d -print0 | sort -z)

if [ ${#sites[@]} -eq 0 ]; then
  echo -e "${RED}✖  No sites found in '$SITES_DIR'.${RESET}"
  exit 1
fi

echo -e "\n${BOLD}Which site do you want to serve?${RESET}\n"
for i in "${!sites[@]}"; do
  echo -e "  ${CYAN}$((i + 1)))${RESET} ${sites[$i]}"
done

echo ""
read -rp "$(echo -e "${BOLD}Enter number [1-${#sites[@]}]:${RESET} ")" choice

if ! [[ "$choice" =~ ^[0-9]+$ ]] || [ "$choice" -lt 1 ] || [ "$choice" -gt ${#sites[@]} ]; then
  echo -e "\n${RED}✖  Invalid selection.${RESET}"
  exit 1
fi

selected="${sites[$((choice - 1))]}"

echo -e "\n${GREEN}✔  Serving '${BOLD}${selected}${RESET}${GREEN}' at http://127.0.0.1:${PORT}${RESET}\n"

cd "$SITES_DIR/$selected" || exit 1
../../.venv/bin/mkdocs serve --dev-addr "127.0.0.1:${PORT}" --livereload
