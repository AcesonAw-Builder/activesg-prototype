#!/bin/bash
TITLE="$1"
DESC="$2"
DATE=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
curl -s -X POST https://api.notion.com/v1/pages \
  -H "Authorization: Bearer $NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d "{\"parent\":{\"database_id\":\"$NOTION_ACTIVESG_DB\"},\"properties\":{\"Name\":{\"title\":[{\"text\":{\"content\":\"$TITLE\"}}]},\"Date\":{\"date\":{\"start\":\"$DATE\"}},\"Notes\":{\"rich_text\":[{\"text\":{\"content\":\"$DESC\"}}]}}}" \
  > /dev/null && echo "✓ Logged to Notion: $TITLE"
