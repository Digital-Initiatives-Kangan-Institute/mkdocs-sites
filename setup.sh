#!/bin/bash
set -e

# ── Colours ───────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

print_step()    { echo -e "${BOLD}${CYAN}▸ $1${RESET}"; }
print_success() { echo -e "${GREEN}✔  $1${RESET}"; }
print_error()   { echo -e "${RED}✖  $1${RESET}" >&2; }

# ── Header ────────────────────────────────────
echo -e "\n${BOLD}${CYAN}╔══════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${CYAN}║         MkDocs Environment Setup     ║${RESET}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════╝${RESET}\n"

# ── Check Python ──────────────────────────────
if ! command -v python3 >/dev/null 2>&1; then
    print_error "python3 is not installed."
    exit 1
fi

# ── Create Virtual Environment ────────────────
if [ ! -d ".venv" ]; then
    print_step "Creating Python virtual environment..."
    python3 -m venv .venv
    print_success ".venv created"
else
    print_success ".venv already exists"
fi

# ── Ensure pip Exists ─────────────────────────
if [ ! -f "./.venv/bin/pip" ]; then
    print_error "pip was not found in .venv"
    exit 1
fi

# ── Upgrade pip ───────────────────────────────
print_step "Upgrading pip..."
./.venv/bin/pip install --upgrade pip

# ── Dependencies ──────────────────────────────
print_step "Installing dependencies..."

./.venv/bin/pip install \
    mkdocs \
    mkdocs-material \
    mkdocs-enumerate-headings-plugin \
    pymdown-extensions \
    pygments

print_success "mkdocs installed"
print_success "mkdocs-material installed"
print_success "mkdocs-enumerate-headings-plugin installed"
print_success "pymdown-extensions installed"
print_success "pygments installed"

# ── Done ──────────────────────────────────────
echo -e "\n${BOLD}${GREEN}╔══════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${GREEN}║   Setup complete! ✓                  ║${RESET}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════╝${RESET}"

echo -e "
  ${CYAN}To create a new site:${RESET}    ./create.sh
  ${CYAN}To serve a site:${RESET}         ./serve.sh
"