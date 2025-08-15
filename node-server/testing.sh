#!/usr/bin/env bash
# Usage: ./testing.sh [BASE_URL]
# Default BASE_URL is http://localhost:3000

set -u
BASE="${1:-http://localhost:3000}"

echo "Testing server at: $BASE"

# ========== /echo ==========
echo
echo "==> GET  /echo?name=Alice"
curl -sS "$BASE/echo?name=Alice" -w "\n[HTTP %{http_code}]\n"

echo
echo "==> POST /echo  (no Content-Type header)"
curl -sS -X POST "$BASE/echo" \
  --data-binary '{"name":"Bob"}' \
  -w "\n[HTTP %{http_code}]\n"

# ========== /api/add ==========
echo
echo "==> GET  /api/add?num1=5&num2=3"
curl -sS "$BASE/api/add?num1=5&num2=3" -w "\n[HTTP %{http_code}]\n"

echo
echo "==> POST /api/add"
curl -sS -X POST "$BASE/api/add" \
  --data-binary '{"num1":5,"num2":3}' \
  -w "\n[HTTP %{http_code}]\n"

# ========== /api/subtract ==========
echo
echo "==> GET  /api/subtract?num1=9&num2=4"
curl -sS "$BASE/api/subtract?num1=9&num2=4" -w "\n[HTTP %{http_code}]\n"

echo
echo "==> POST /api/subtract"
curl -sS -X POST "$BASE/api/subtract" \
  --data-binary '{"num1":9,"num2":4}' \
  -w "\n[HTTP %{http_code}]\n"

# ========== /api/multiply ==========
echo
echo "==> GET  /api/multiply?num1=6&num2=7"
curl -sS "$BASE/api/multiply?num1=6&num2=7" -w "\n[HTTP %{http_code}]\n"

echo
echo "==> POST /api/multiply"
curl -sS -X POST "$BASE/api/multiply" \
  --data-binary '{"num1":6,"num2":7}' \
  -w "\n[HTTP %{http_code}]\n"

# ========== /api/divide ==========
echo
echo "==> GET  /api/divide?num1=12&num2=3"
curl -sS "$BASE/api/divide?num1=12&num2=3" -w "\n[HTTP %{http_code}]\n"

echo
echo "==> POST /api/divide"
curl -sS -X POST "$BASE/api/divide" \
  --data-binary '{"num1":12,"num2":3}' \
  -w "\n[HTTP %{http_code}]\n"

# divide-by-zero branches
echo
echo "==> GET  /api/divide?num1=12&num2=0"
curl -sS "$BASE/api/divide?num1=12&num2=0" -w "\n[HTTP %{http_code}]\n"

echo
echo "==> POST /api/divide  (divide-by-zero)"
curl -sS -X POST "$BASE/api/divide" \
  --data-binary '{"num1":12,"num2":0}' \
  -w "\n[HTTP %{http_code}]\n"

# ========== /api/cat ==========
echo
echo "==> GET  /api/cat"
curl -sS "$BASE/api/cat" -w "\n[HTTP %{http_code}]\n"

# ========== Fallback ==========
echo
echo "==> GET  /does-not-exist"
curl -sS "$BASE/does-not-exist" -w "\n[HTTP %{http_code}]\n"
