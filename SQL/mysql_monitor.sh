#!/bin/bash
echo "MySQL Status at $(date)"
mysqladmin -u root -p status
echo "Top 5 CPU consuming queries:"
mysql -u root -p -e "SELECT * FROM information_schema.PROCESSLIST ORDER BY TIME DESC LIMIT 5;" 