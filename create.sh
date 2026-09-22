#!/usr/bin/env bash

# ─────────────────────────────────────────────
#  MkDocs Site Creator
# ─────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITES_DIR="$SCRIPT_DIR/sites"
BASE_DIR="$SCRIPT_DIR/base"

# ── Colours ───────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

print_header() {
  echo -e "\n${BOLD}${CYAN}╔══════════════════════════════════════╗${RESET}"
  echo -e "${BOLD}${CYAN}║       MkDocs Site Creator            ║${RESET}"
  echo -e "${BOLD}${CYAN}╚══════════════════════════════════════╝${RESET}\n"
}

print_step()    { echo -e "${BOLD}${CYAN}▸ $1${RESET}"; }
print_success() { echo -e "${GREEN}✔  $1${RESET}"; }
print_error()   { echo -e "${RED}✖  $1${RESET}" >&2; }
print_warn()    { echo -e "${YELLOW}⚠  $1${RESET}"; }

# ── Palette menu ──────────────────────────────
PALETTES=(
  "red" "pink" "purple" "deep purple"
  "indigo" "blue" "light blue" "cyan"
  "teal" "green" "light green" "lime"
  "yellow" "amber" "orange" "deep orange"
  "brown" "grey" "blue grey" "black" "white"
)

choose_palette() {
  echo -e "${BOLD}Available palettes:${RESET}\n"

  local cols=3
  local total=${#PALETTES[@]}
  local rows=$(( (total + cols - 1) / cols ))

  for (( r=0; r<rows; r++ )); do
    for (( c=0; c<cols; c++ )); do
      local idx=$(( r + c * rows ))
      if (( idx < total )); then
        local num=$(( idx + 1 ))
        printf "  ${CYAN}%2d)${RESET} %-16s" "$num" "${PALETTES[$idx]}"
      fi
    done
    echo
  done

  echo
  while true; do
    read -rp "$(echo -e "${BOLD}Select a palette [1-${total}]:${RESET} ")" choice
    if [[ "$choice" =~ ^[0-9]+$ ]] && (( choice >= 1 && choice <= total )); then
      SELECTED_PALETTE="${PALETTES[$((choice - 1))]}"
      return
    fi
    print_warn "Please enter a number between 1 and ${total}."
  done
}

# ── to-kebab helper ───────────────────────────
to_kebab() {
  echo "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/[^a-z0-9 ]//g' \
    | sed 's/  */ /g' \
    | sed 's/^ //; s/ $//' \
    | tr ' ' '-'
}

# ═════════════════════════════════════════════
#  Main
# ═════════════════════════════════════════════
print_header

# 1. Site name ─────────────────────────────────
print_step "Site name"
while true; do
  read -rp "Enter the site name (spaces allowed): " SITE_NAME
  SITE_NAME="$(echo "$SITE_NAME" | sed 's/^ *//; s/ *$//')"
  [[ -n "$SITE_NAME" ]] && break
  print_warn "Site name cannot be empty."
done

SITE_FOLDER="$(to_kebab "$SITE_NAME")"
SITE_PATH="$SITES_DIR/$SITE_FOLDER"

echo -e "  Folder name: ${YELLOW}${SITE_FOLDER}${RESET}\n"

if [[ -d "$SITE_PATH" ]]; then
  print_error "A site named '${SITE_FOLDER}' already exists at: $SITE_PATH"
  exit 1
fi

# 2. Palette ───────────────────────────────────
print_step "Choose a colour palette"
choose_palette
echo -e "\n  Selected: ${YELLOW}${SELECTED_PALETTE}${RESET}\n"

# 3. Validate base assets ──────────────────────
print_step "Checking base assets"

MKDOCS_TEMPLATE="$BASE_DIR/mkdocs.yml"
STYLE_SOURCE="$BASE_DIR/extra/style.css"
INDEX_SOURCE="$BASE_DIR/docs/index.md"

if [[ ! -f "$MKDOCS_TEMPLATE" ]]; then
  print_error "Missing base template: $MKDOCS_TEMPLATE"
  exit 1
fi

if [[ ! -f "$STYLE_SOURCE" ]]; then
  print_error "Missing base stylesheet: $STYLE_SOURCE"
  exit 1
fi

if [[ ! -f "$INDEX_SOURCE" ]]; then
  print_error "Missing base index page: $INDEX_SOURCE"
  exit 1
fi

print_success "Base assets found"

# 4. Build directory structure ─────────────────
print_step "Creating site structure"

mkdir -p "$SITE_PATH/docs/extra"
print_success "Created: $SITE_PATH/docs/extra/"

# 5. Copy & populate mkdocs.yml ────────────────
MKDOCS_DEST="$SITE_PATH/mkdocs.yml"
cp "$MKDOCS_TEMPLATE" "$MKDOCS_DEST"

# Replace tokens (works on both GNU and BSD sed)
sed -i.bak \
  -e "s|<SITE-NAME>|${SITE_NAME}|g" \
  -e "s|<SITE-PALETTE>|${SELECTED_PALETTE}|g" \
  "$MKDOCS_DEST"
rm -f "${MKDOCS_DEST}.bak"

print_success "Created: mkdocs.yml  (tokens substituted)"

# 6. Copy index.md ─────────────────────────────
cp "$INDEX_SOURCE" "$SITE_PATH/docs/index.md"
print_success "Copied:  docs/index.md"

# ── Summary ───────────────────────────────────
echo -e "\n${BOLD}${GREEN}╔══════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${GREEN}║   Site created successfully! 🎉      ║${RESET}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════╝${RESET}"
echo -e "
  ${BOLD}Site name:${RESET}    $SITE_NAME
  ${BOLD}Palette:${RESET}      $SELECTED_PALETTE
  ${BOLD}Location:${RESET}     $SITE_PATH

  ${BOLD}Structure:${RESET}
  ${SITE_FOLDER}/
  ├── mkdocs.yml
  └── docs/
      ├── index.md
      └── extra/

  ${CYAN}To start your site, run:${RESET}
    ./serve.sh
"