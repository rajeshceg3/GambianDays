#!/usr/bin/env python3
"""Verification runner for GambianDays. See SKILL.md."""
import json, os, re, signal, subprocess, sys, time, urllib.request
from pathlib import Path
REPO = Path(__file__).resolve().parents[3]
CHROME = os.environ.get('CHROME_PATH', '/usr/bin/google-chrome')
failures = []
def check(name, ok, detail=''):
    print(('PASS' if ok else 'FAIL'), name, (':: ' + str(detail))[:400] if detail else '')
    if not ok: failures.append(name)
def run(cmd, **kw):
    return subprocess.run(cmd, cwd=REPO, capture_output=True, text=True, timeout=900, **kw)
def main():
    if not (REPO / 'node_modules').is_dir():
        check('npm install', run(['npm', 'install', '--no-audit', '--no-fund']).returncode == 0)
    proc = run(['npm', 'run', 'build'])
    check('next build', proc.returncode == 0, (proc.stdout + proc.stderr)[-300:])
    server = subprocess.Popen(['node', '.next/standalone/server.js'], cwd=REPO, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True, env=dict(os.environ, PORT='3101'))
    try:
        up = False
        for _ in range(60):
            try:
                if urllib.request.urlopen('http://127.0.0.1:3101/', timeout=2).status == 200:
                    up = True; break
            except Exception:
                time.sleep(0.5)
        check('server up', up)
        proc = subprocess.run([CHROME, '--headless=new', '--no-sandbox', '--disable-gpu',
                               '--virtual-time-budget=8000', '--window-size=1280,900',
                               '--dump-dom', 'http://127.0.0.1:3101/'],
                              capture_output=True, text=True, timeout=120)
        dom = proc.stdout
        check('render: app boots', 'Gambia | The Smiling Coast' in dom, dom[:200])
        errs = [l for l in proc.stderr.splitlines() if 'console' in l.lower() and 'error' in l.lower()
                and not re.search(r'dbus|gpu|vulkan|ozone|fontconfig', l, re.I)]
        check('render: no js console errors', not errs, errs[:3])
    finally:
        try: os.killpg(os.getpgid(server.pid), signal.SIGTERM)
        except Exception: pass
    print('FAILURES=%d' % len(failures))
    with open(REPO / '.cursor/skills/verify-gambian-days/evidence.json', 'w') as f:
        json.dump({'repo': 'GambianDays', 'ts': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'failures': failures}, f, indent=2)
    return 1 if failures else 0
if __name__ == '__main__':
    sys.exit(main())
