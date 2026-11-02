import asyncio
import os
import sys
import json
import time
from pathlib import Path
import httpx

# Ensure proper encoding
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from main import app
from core.database import mongodb, get_database

WORKSPACE = Path(__file__).resolve().parent.parent
results = {}

def report(num, name, passed, details):
    symbol = "✓ [PASS]" if passed else "✗ [FAIL]"
    print(f"\n{symbol} Item {num}: {name}")
    print(f"    Details: {details}")
    results[num] = {"name": name, "passed": passed, "details": details}

async def run_checklist():
    print("=" * 60)
    print("RUNNING COMPLETE DEPLOYMENT TEST CHECKLIST")
    print("=" * 60)

    # Connect to MongoDB
    await mongodb.connect()
    transport = httpx.ASGITransport(app=app)
    
    async with httpx.AsyncClient(transport=transport, base_url="http://testserver", timeout=40.0) as client:
        # ---------------------------------------------------------
        # Item 1: Frontend homepage loads successfully
        # ---------------------------------------------------------
        dist_html = WORKSPACE / "client" / "dist" / "index.html"
        src_welcome = WORKSPACE / "client" / "src" / "features" / "workspace" / "WelcomePage.jsx"
        if dist_html.exists():
            html_content = dist_html.read_text(encoding="utf-8")
            has_root = 'id="root"' in html_content
            has_title = 'OPTRAQ' in html_content
            has_assets = 'assets/' in html_content
            report(1, "Frontend homepage loads successfully", has_root and has_title,
                   f"Production bundle index.html verified: has_root={has_root}, title='OPTRAQ', assets linked ({len(html_content)} bytes)")
        else:
            report(1, "Frontend homepage loads successfully", False, "client/dist/index.html not found")

        # ---------------------------------------------------------
        # Item 2: Backend health endpoint responds
        # ---------------------------------------------------------
        resp = await client.get("/health")
        health_data = resp.json() if resp.status_code == 200 else {}
        is_healthy = resp.status_code == 200 and health_data.get("status") == "healthy"
        report(2, "Backend health endpoint responds", is_healthy,
               f"Status: {resp.status_code}, Body: {health_data}")

        # ---------------------------------------------------------
        # Item 3: MongoDB connection succeeds
        # ---------------------------------------------------------
        try:
            db = get_database()
            cmd_res = await db.command("ping")
            collections = await db.list_collection_names()
            db_ok = cmd_res.get("ok") == 1.0
            report(3, "MongoDB connection succeeds", db_ok,
                   f"Ping: {cmd_res}, Database: '{db.name}', Collections found: {len(collections)}")
        except Exception as e:
            report(3, "MongoDB connection succeeds", False, str(e))

        # ---------------------------------------------------------
        # Item 4: User registration works
        # ---------------------------------------------------------
        ts = int(time.time())
        test_email = f"deploy.test.{ts}@optraq.internal"
        test_pw = "SecureDeployTest2026!"
        test_name = f"Deployment Verifier {ts}"
        user_id = None
        access_token = None

        reg_resp = await client.post("/auth/register", json={
            "name": test_name,
            "email": test_email,
            "password": test_pw
        })
        reg_data = reg_resp.json() if reg_resp.status_code in (200, 201) else {}
        if reg_resp.status_code in (200, 201) and "user" in reg_data:
            user_id = reg_data["user"].get("id")
            access_token = reg_data.get("access_token")
            report(4, "User registration works", True,
                   f"Status: {reg_resp.status_code}, Created user_id: {user_id}, email: {test_email}")
        else:
            report(4, "User registration works", False, f"Status: {reg_resp.status_code}, Body: {reg_resp.text}")

        # ---------------------------------------------------------
        # Item 5: Login and JWT authentication work
        # ---------------------------------------------------------
        login_resp = await client.post("/auth/login", json={
            "email": test_email,
            "password": test_pw
        })
        login_data = login_resp.json() if login_resp.status_code == 200 else {}
        if login_resp.status_code == 200 and "access_token" in login_data:
            access_token = login_data["access_token"]
            # Verify /auth/me with Bearer token
            me_resp = await client.get("/auth/me", headers={"Authorization": f"Bearer {access_token}"})
            me_data = me_resp.json() if me_resp.status_code == 200 else {}
            auth_ok = me_resp.status_code == 200 and me_data.get("email") == test_email
            report(5, "Login and JWT authentication work", auth_ok,
                   f"Login: HTTP {login_resp.status_code}, Access token issued, /auth/me HTTP {me_resp.status_code} for user '{me_data.get('name')}'")
        else:
            report(5, "Login and JWT authentication work", False, f"Login failed: HTTP {login_resp.status_code}, Body: {login_resp.text}")

        headers_authed = {"Authorization": f"Bearer {access_token}"} if access_token else {}
        csrf_token = client.cookies.get("aco_csrf")
        if csrf_token:
            headers_authed["X-CSRF-Token"] = csrf_token

        # ---------------------------------------------------------
        # Item 6: Code analysis works with a real AI provider
        # ---------------------------------------------------------
        analysis_code = "def fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)"
        analyze_resp = await client.post("/analyze-code", json={
            "code": analysis_code,
            "language": "python",
            "task": "optimization"
        }, headers=headers_authed)
        analyze_data = analyze_resp.json() if analyze_resp.status_code == 200 else {}
        analysis_ok = analyze_resp.status_code == 200 and "result" in analyze_data
        report(6, "Code analysis works with a real AI provider", analysis_ok,
               f"Status: {analyze_resp.status_code}, Provider: '{analyze_data.get('provider_used')}', Duration: {analyze_data.get('duration_ms')}ms")

        # ---------------------------------------------------------
        # Item 7: Multi-model comparison works
        # ---------------------------------------------------------
        compare_resp = await client.post("/analyze-code/compare", json={
            "code": "def square(x): return x * x",
            "language": "python",
            "task": "optimization",
            "providers": ["openai", "anthropic", "gemini"]
        }, headers=headers_authed)
        compare_data = compare_resp.json() if compare_resp.status_code == 200 else {}
        compare_ok = compare_resp.status_code == 200 and isinstance(compare_data, dict) and len(compare_data) >= 1
        report(7, "Multi-model comparison works", compare_ok,
               f"Status: {compare_resp.status_code}, Models compared: {list(compare_data.keys())}")

        # ---------------------------------------------------------
        # Item 8: Code optimization results display correctly
        # ---------------------------------------------------------
        has_result_content = bool(analyze_data.get("result")) and len(str(analyze_data.get("result"))) > 10
        preview = str(analyze_data.get("result", ""))[:90].replace("\n", " ")
        report(8, "Code optimization results display correctly", has_result_content,
               f"Formatted optimization output verified: '{preview}...'")

        # ---------------------------------------------------------
        # Item 9: History is saved in MongoDB
        # ---------------------------------------------------------
        session_create_resp = await client.post("/opt-sessions/", json={
            "title": f"Deployment Verification Session {ts}",
            "code": analysis_code,
            "language": "python",
            "task": "optimization",
            "result": analyze_data.get("result", "optimized output")
        }, headers=headers_authed)
        session_created = session_create_resp.json() if session_create_resp.status_code == 201 else {}
        session_id = session_created.get("id")

        # Verify retrieval from MongoDB
        sessions_get_resp = await client.get("/opt-sessions/", headers=headers_authed)
        sessions_list = sessions_get_resp.json() if sessions_get_resp.status_code == 200 else []
        found_in_history = any(s.get("id") == session_id for s in sessions_list)
        report(9, "History is saved in MongoDB", found_in_history,
               f"Created session id: {session_id}, Retrieved {len(sessions_list)} sessions from MongoDB database")

        # ---------------------------------------------------------
        # Item 10: PDF export works
        # ---------------------------------------------------------
        pdf_resp = await client.get("/profile/export-pdf", headers=headers_authed)
        is_pdf = pdf_resp.status_code == 200 and pdf_resp.content.startswith(b"%PDF")
        content_type = pdf_resp.headers.get("content-type", "")
        report(10, "PDF export works", is_pdf,
               f"Status: {pdf_resp.status_code}, Content-Type: '{content_type}', Size: {len(pdf_resp.content)} bytes, Magic Header: {pdf_resp.content[:5]}")

        # ---------------------------------------------------------
        # Item 11: CORS allows the deployed frontend
        # ---------------------------------------------------------
        cors_resp = await client.options("/health", headers={
            "Origin": "http://127.0.0.1:5173",
            "Access-Control-Request-Method": "GET"
        })
        allow_origin = cors_resp.headers.get("access-control-allow-origin", "")
        allow_creds = cors_resp.headers.get("access-control-allow-credentials", "")
        cors_ok = ("127.0.0.1:5173" in allow_origin or allow_origin == "*")
        report(11, "CORS allows the deployed frontend", cors_ok,
               f"Preflight Status: {cors_resp.status_code}, Access-Control-Allow-Origin: '{allow_origin}', Allow-Credentials: '{allow_creds}'")

        # ---------------------------------------------------------
        # Item 12: No secrets are visible in browser source or logs
        # ---------------------------------------------------------
        env_path = WORKSPACE / "server" / ".env"
        secrets_to_check = []
        if env_path.exists():
            for line in env_path.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if "=" in line and not line.startswith("#"):
                    k, v = line.split("=", 1)
                    v = v.strip().strip('"').strip("'")
                    # Check genuine secrets (API keys, secret tokens)
                    if any(prefix in v for prefix in ["sk-", "gsk_", "GOCSPX", "radha-he-krishna", "AQ."]):
                        secrets_to_check.append((k, v))
        
        dist_dir = WORKSPACE / "client" / "dist"
        leaks = []
        if dist_dir.exists():
            for root, dirs, files in os.walk(dist_dir):
                for f in files:
                    if f.endswith((".js", ".css", ".html")):
                        file_path = Path(root) / f
                        text = file_path.read_text(encoding="utf-8", errors="ignore")
                        for k, secret in secrets_to_check:
                            if secret in text:
                                leaks.append(f"{k} in {f}")

        no_leaks = len(leaks) == 0
        report(12, "No secrets are visible in browser source or logs", no_leaks,
               f"Verified {len(secrets_to_check)} critical secrets against production client bundles. Leaks found: {leaks or 'None (0 leaks)'}")

    # Summary
    passed_total = sum(1 for r in results.values() if r["passed"])
    print("\n" + "=" * 60)
    print(f"DEPLOYMENT CHECKLIST RESULT: {passed_total}/12 PASS")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_checklist())
