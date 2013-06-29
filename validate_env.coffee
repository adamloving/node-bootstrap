expectedVars = []

for v in expectedVars
  throw new Error("Expected environment variable #{v} not set") unless process.env[v]