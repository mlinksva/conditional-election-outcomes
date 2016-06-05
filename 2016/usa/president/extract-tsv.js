candidates = ["Hillary Clinton", "Ted Cruz", "John Kasich", "Bernie Sanders", "Donald Trump"];
candidates_counts = Array(candidates.length).fill(0);
candidates_sums = Array(candidates.length).fill(0);

console.log("Time\t"+candidates.join("\t"));

function candidate_from(a, name) {
  for (i in a) {
    if (a[i][0] == name) { return a[i]; }
  };
}

function win_if_nominee(win, nominee) {
  if (nominee == 0) return "";
  p = Math.round(100 * win / nominee);
  if (p >= 100 || p == 0) {
    return "";
  } else {
    return p;
  }
}

function date_fix(timestamp) {
  re = /(\d+)-(\d+)-(\d+) (\d+):(\d+)(\w+)/;
  m = timestamp.match(re)
  h = parseInt(m[4]);
  if (m[6] == "PM" && h < 12) {
    h += 12;
  } else if (m[6] == "AM") {
    if (h < 10) {
      h = "0" + h;
    } else if (h == 12) {
      h = "00";
    }
  }
  return m[3] + "-" + m[1] + "-" + m[2] + " " + h + ":" + m[5];
}

var t = require("./table_1664.json");
t.history.forEach(function(entry) {
  row = [date_fix(entry.timestamp)];
  for (j in candidates) {
    p = "";
    candidate_table = candidate_from(entry.table, candidates[j]);
    if (candidate_table) {
      win = candidate_table[2].split(' ')[0];
      nominee = candidate_table[3].split(' ')[0];
      p = win_if_nominee(win, nominee);
    }
    if (p != "") {
      candidates_counts[j]++;
      candidates_sums[j] += p;
    }
    row.push(p);
  }
  console.log(row.join("\t"));
});

console.log("# Average\t"+candidates_sums.map(function(v,i){return Math.round(v / candidates_counts[i]);}).join("\t"));
