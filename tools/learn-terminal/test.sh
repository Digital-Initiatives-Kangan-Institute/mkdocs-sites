#!/usr/bin/env bash
cd "$(dirname "$0")"

results=()
failures=0

run_test() {
  local name=$1 file=$2
  node "$file"
  local code=$?
  results+=("$name:$code")
  if [ "$code" -ne 0 ]; then ((failures++)); fi
  return $code
}

run_test "Tokenizer" "tests/test-tokenizer.js"
run_test "mv / cp"   "tests/test-mv-cp.js"
run_test "All"       "tests/test-all.js"

echo ""
echo -e "  \033[1mCombined Test Summary\033[0m"
echo -e "  \033[2m──────────────────────────────────\033[0m"
for r in "${results[@]}"; do
  name="${r%%:*}"
  code="${r##*:}"
  if [ "$code" -eq 0 ]; then
    echo -e "  \033[32m✓\033[0m \033[1m$name\033[0m  \033[32mpassed\033[0m"
  else
    echo -e "  \033[31m✗\033[0m \033[1m$name\033[0m  \033[31mFAILED (exit $code)\033[0m"
  fi
done
echo -e "  \033[2m──────────────────────────────────\033[0m"
if [ "$failures" -eq 0 ]; then
  echo -e "  \033[32m\033[1mAll test suites passed.\033[0m"
else
  echo -e "  \033[31m\033[1m$failures test suite(s) failed.\033[0m"
fi
echo ""
exit "$failures"
exit "$failures"
