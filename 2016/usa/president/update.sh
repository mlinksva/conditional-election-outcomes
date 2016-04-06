#!/bin/sh

# found by inspecting http://predictwise.com/politics/2016-president-winner
# table only goes back to 2016-03-08; older data exists on the site that
# could be merged
curl -O http://table-cache1.predictwise.com/history/table_1664.json

# extracts % winner and nominee values from the downloaded file
# divides winner by nominee and outputs in tabular format
node extract-tsv > table_1664.tsv

# gnuplot graphs values to .svg
./table_1664.gpi
