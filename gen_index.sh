#!/usr/bin/env bash
set -euo pipefail

# Silence Material for MkDocs' "MkDocs 2.0" banner
export NO_MKDOCS_2_WARNING=true

INDEX_DIR="build/indexes"
mkdir -p "$INDEX_DIR"

for site in sites/*/; do
  name="$(basename "$site")"

  # Skip folders that aren't MkDocs sites
  [[ -f "$site/mkdocs.yml" ]] || { echo "Skipping $name (no mkdocs.yml)"; continue; }

  overlay="$site/mkdocs.rag.yml"
  printf 'INHERIT: mkdocs.yml\nplugins:\n  search: {}\n' > "$overlay"

  echo "Building $name..."
  mkdocs build -q -f "$overlay" -d "../../build/$name"
  rm -f "$overlay"   # remove the temporary overlay config

  index="build/$name/search/search_index.json"
  if [[ -f "$index" ]]; then
    cp "$index" "$INDEX_DIR/$name.json"
  else
    echo "Warning: no search index found for $name" >&2
  fi
done

echo "Done. Indexes saved to $INDEX_DIR/"