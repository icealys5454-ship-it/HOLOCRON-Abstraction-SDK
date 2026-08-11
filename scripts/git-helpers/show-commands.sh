#!/usr/bin/env bash
# Safe helper: print recommended commands for merge / squash / rebase workflows.
# This script only prints commands; it does not run them.

cmd="$1"
branch="${2:-feature/my-work}"
target="${3:-main}"

case "$cmd" in
  merge)
    echo "Merge (preserve history):"
    echo "  git checkout $target"
    echo "  git pull --ff-only"
    echo "  git merge --no-ff $branch"
    echo "  git push"
    ;;
  squash)
    echo "Squash (merge --squash):"
    echo "  git checkout $target"
    echo "  git pull"
    echo "  git merge --squash $branch"
    echo "  git commit -m \"<squashed commit message>\""
    echo "  git push"
    ;;
  rebase)
    echo "Rebase feature branch onto target:"
    echo "  git checkout $branch"
    echo "  git fetch origin"
    echo "  git rebase origin/$target"
    echo "  # resolve conflicts, then:"
    echo "  git push --force-with-lease"
    ;;
  *)
    echo "Usage: $0 {merge|squash|rebase} [branch] [target]"
    ;;
esac
