import urllib.request, json, sys

key = "sbp_f3751a74f72f1454b6173419005c6e7037cf5917"
ref = "mmnxnjqwrawcpkyebjzf"

# Try to get project config which may have the anon key
req = urllib.request.Request(
    f"https://api.supabase.com/v1/projects/{ref}",
    headers={"Authorization": f"Bearer {key}"}
)
try:
    resp = urllib.request.urlopen(req, timeout=10)
    data = json.loads(resp.read())
    print(json.dumps(data, indent=2))
except Exception as e:
    print(f"Error: {e}")
    if hasattr(e, 'read'):
        print(e.read().decode()[:500])
