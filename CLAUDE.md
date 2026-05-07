
## ActiveSG Prototype
- This is a design prototype — no real API calls, all data from /lib/mockData.ts
- Singpass login is out of scope — always render authenticated state
- All flows use optimistic UI — mutations update local state only
- QR tokens are mock strings — render using qrcode.react
- Target: mobile Chrome / Safari at 390px viewport
- Before making changes to visual design, check /prototype_02_visual_context.md
- Data shapes are in /prototype_03_data_context.md and /lib/types.ts

## Shell rules
- Always use `tmux send-keys -t activesg "COMMAND" Enter` to run commands in the session
- Never pass flags like --flag directly to tmux; flags must be inside the quoted command string
- For multi-line commands, chain with && on a single line — avoid backslash continuations in zsh
- Always use `git add .` or `git add -A` for staging — never generate multi-line git commands with backslash continuations

## Context7
- When writing Next.js, React, Framer Motion, or Tailwind code, use Context7 MCP to look up current documentation before writing

## Devlog & changelog rules
- After completing any task, append an entry to the devlog:
  `printf "## $(date '+%Y-%m-%d %H:%M')\n**Task:** [title]\n**Changed:** [files]\n**Notes:** [notes]\n\n" >> "/Users/acesonaw/Desktop/Aceson Aw CV/Aceson CV - 2024 - 2025/Applied roles 2025 - Aceson Aw CV/Aceson Aw Portfolio - Jul 2025/Claude Code Projects/activesg/devlog.md"`
- Then log to Notion: `./notion-log.sh "Task title" "Brief description of what changed"`
- Keep Notion titles under 60 chars
- Always do both — devlog first, then Notion
