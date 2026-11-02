# Graph Report - ai-code-optimizer  (2026-09-28)

## Corpus Check
- 218 files · ~111,910 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: (none) 8, .manual 4, .css 1)

## Summary
- 1772 nodes · 4015 edges · 117 communities (87 shown, 30 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 121 edges (avg confidence: 0.93)
- Token cost: 12,500 input · 3,200 output

## Community Hubs (Navigation)
- Docker Sandbox & Container Isolation
- Review Pipeline & Multi-Stage Analysis
- API Keys & Provider Configuration
- Complexity Engine & Metric Calculation
- Complexity Engine & Metric Calculation
- Data Models & Schemas
- User Profile & Account Management
- Monaco Code Editor & Client UI
- API Keys & Provider Configuration
- Authentication & Security Protocols
- Monaco Code Editor & Client UI
- WebSocket Collaboration & Room Presence
- Authentication & Security Protocols
- Authentication & Security Protocols
- Authentication & Security Protocols
- Interactive Analytics Dashboards
- Analysis & Inspection Routes
- Custom Rules Engine & AST Matcher
- Authentication & Security Protocols
- Code Execution & Sandbox Routes
- Report Generation & PDF Export
- Authentication & Security Protocols
- Authentication & Security Protocols
- Frontend Feature Components
- MongoDB Persistence & Data Layer
- Report Generation & PDF Export
- Monaco Code Editor & Client UI
- Authentication & Security Protocols
- Repo Importer Services
- Data Models & Schemas
- Step Executor Execution
- Crypto Security Encryption
- MongoDB Persistence & Data Layer
- Package Devdependencies Json
- Rate Limiting & Quota Management
- GitHub Integration & Repository Sync
- Data Models & Schemas
- Analyze Code Rationale
- GitHub Integration & Repository Sync
- Team Routes Create
- MongoDB Persistence & Data Layer
- Authentication & Security Protocols
- Security Core Token
- Project Analyzer Testdependencygraph
- Project Analyzer Services
- Custom Rules Engine & AST Matcher
- Sandbox Manager Compare
- Report Generation & PDF Export
- Custom Rules Engine & AST Matcher
- Data Models & Schemas
- Shared React UI Components
- Analytics Routes Rationale
- Phone Migrations Index
- Frontend Feature Components
- Email Service Services
- API Keys & Provider Configuration
- Analytics Engine & Code Health
- MongoDB Persistence & Data Layer
- Monaco Code Editor & Client UI
- MongoDB Persistence & Data Layer
- Project Analysis Analyzer
- Report Generation & PDF Export
- Report Generation & PDF Export
- MongoDB Persistence & Data Layer
- Analytics Engine & Code Health
- Health Rationale Endpoint
- Frontend Feature Components
- Analysis Repo Scanner
- Report Generation & PDF Export
- MongoDB Persistence & Data Layer
- Project Analyzer Testaggregatemetrics
- Project Analyzer Testdetectlanguage
- Manifest Public Json
- Analytics Engine & Code Health
- Report Generation & PDF Export
- Analytics Engine & Code Health
- Pipeline Integration Compare
- Package Scripts Json
- Authentication & Security Protocols
- MongoDB Persistence & Data Layer
- Analytics Engine & Code Health
- Custom Rules Engine & AST Matcher
- Report Generation & PDF Export
- Eslint Plugin React
- Config Vite Vitest
- Output Comparator Execution
- Data Models & Schemas
- Rules Routes Rule
- Rate Limiting & Quota Management
- Custom Rules Engine & AST Matcher
- Main Safestaticfiles Staticfiles
- Custom Rules Engine & AST Matcher
- GitHub Integration & Repository Sync
- Services Analysis Secret
- Public Static Assets
- Authentication & Security Protocols
- Sandbox Manager Images
- Sandbox Manager Docker
- Docker Compose Multi
- Type Safety Docs
- GitHub Integration & Repository Sync
- Readme Verified Optimization

## God Nodes (most connected - your core abstractions)
1. `get_database()` - 89 edges
2. `react` - 63 edges
3. `framer-motion` - 35 edges
4. `login()` - 28 edges
5. `ask_ai()` - 27 edges
6. `analyze_complexity()` - 26 edges
7. `useOptimizer()` - 24 edges
8. `GitHubService` - 24 edges
9. `ProviderConfigError` - 23 edges
10. `build_dependency_graph()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `Static vs AI Decoupling Principle` --rationale_for--> `StaticAnalysisStage`  [INFERRED]
  ARCHITECTURE.md → server/services/analysis/review_pipeline.py
- `AI Code Optimizer Platform Core` --references--> `ReviewPipeline`  [INFERRED]
  README.md → server/services/analysis/review_pipeline.py
- `Hybrid Static + LLM Review Hypothesis` --conceptually_related_to--> `ReviewPipeline`  [INFERRED]
  RESEARCH.md → server/services/analysis/review_pipeline.py
- `Synthetic Seed Benchmark Methodology` --references--> `main()`  [EXTRACTED]
  RESEARCH.md → research/run_static_vs_ai.py
- `Docker Sandbox Isolation Guard` --references--> `should_use_docker()`  [EXTRACTED]
  ARCHITECTURE.md → server/services/execution/docker_runner.py

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Review Pipeline Multi-Stage Architecture** — server_services_analysis_review_pipeline_reviewpipeline, server_services_analysis_review_pipeline_staticanalysisstage, server_services_analysis_review_pipeline_aireviewstage, server_services_analysis_review_pipeline_aggregationstage [EXTRACTED 1.00]
- **Declarative YAML Rule Packs** — server_data_rules_clean_code_clean_code_rules, server_data_rules_security_owasp_owasp_security_rules, server_data_rules_performance_performance_rules, server_data_rules_python_style_python_style_rules, server_data_rules_javascript_modern_javascript_modern_rules [EXTRACTED 1.00]

## Communities (117 total, 30 thin omitted)

### Community 0 - "Docker Sandbox & Container Isolation"
Cohesion: 0.06
Nodes (79): Docker Sandbox Isolation Guard, CompletedProcess, locale, Scan code for secrets and dangerous patterns., scan_secrets(), get_image(), is_production(), Docker container runner with resource limits and security isolation. (+71 more)

### Community 1 - "Review Pipeline & Multi-Stage Analysis"
Cohesion: 0.07
Nodes (52): Static vs AI Decoupling Principle, dataclasses, AI Code Optimizer Platform Core, Hybrid Static + LLM Review Hypothesis, inspect_code_report_endpoint(), Generate a Markdown proof report from deterministic local inspection., WebSocket collaboration manager with OT-based concurrent editing., _build_report() (+44 more)

### Community 2 - "API Keys & Provider Configuration"
Cohesion: 0.06
Nodes (62): retry, delete_api_key(), _mask_key(), BaseModel, delete, put, Remove a stored API key., Return masked version: first 4 + ... + last 4. (+54 more)

### Community 3 - "Complexity Engine & Metric Calculation"
Cohesion: 0.07
Nodes (51): AsyncFunctionDef, FunctionDef, math, Module, analyze_complexity(), _analyze_non_python(), _build_call_graph(), _cognitive_complexity() (+43 more)

### Community 4 - "Complexity Engine & Metric Calculation"
Cohesion: 0.07
Nodes (41): ast, given, hypothesis, json, platform, radon_complexity, ai_with_context(), main() (+33 more)

### Community 5 - "Data Models & Schemas"
Cohesion: 0.07
Nodes (34): Enum, field_validator, get_languages_by_category(), get_popular_languages(), get_supported_languages(), is_valid_programming_language(), LanguageCategory, LanguageInfo (+26 more)

### Community 6 - "User Profile & Account Management"
Cohesion: 0.10
Nodes (40): patch, _avatars_dir(), _calculate_account_age_days(), ChangePasswordReq, delete_account(), export_demo_pdf(), export_profile(), export_profile_pdf() (+32 more)

### Community 7 - "Monaco Code Editor & Client UI"
Cohesion: 0.13
Nodes (26): CodeEditor(), languageMap, AmbientBackground(), FeaturePageLayout(), FileDropZone(), AnalysisPage(), BugDetectionPage(), DebuggingPage() (+18 more)

### Community 8 - "API Keys & Provider Configuration"
Cohesion: 0.11
Nodes (35): logging, analyze_code(), cache_stats_endpoint(), get_supported_languages_endpoint(), get, Analysis API routes: /analyze-code, /analyze-code/compare, /inspect-code,…, Cache statistics: entries, hits, estimated cost savings., Get all supported programming languages. (+27 more)

### Community 9 - "Authentication & Security Protocols"
Cohesion: 0.10
Nodes (24): EmailStr, forgot_password(), register(), _ensure_user(), change_password(), Convert MongoDB document ObjectId to string. Returns a new dict., serialize_doc(), PasswordManager (+16 more)

### Community 10 - "Monaco Code Editor & Client UI"
Cohesion: 0.10
Nodes (23): AmbientBackground(), ProgressBar(), Toast(), AnalyticsDashboard(), COLORS, DEBT_COLORS, DEBT_ICONS, DEBT_LABELS (+15 more)

### Community 11 - "WebSocket Collaboration & Room Presence"
Cohesion: 0.09
Nodes (16): CollaborationManager, EditOperation, WebSocket, A single text edit operation for Operational Transform., Broadcast a line comment to all users in the room. comment_data keys: line,…, Transform op_a against op_b (both applied to the same document state). Returns…, Apply an edit operation with OT conflict resolution. Parameters ----------…, transform_operation() (+8 more)

### Community 12 - "Authentication & Security Protocols"
Cohesion: 0.10
Nodes (27): fastapi_security, hmac, secrets, auth_health(), Config, get_current_user_info(), get_user_sessions(), BaseModel (+19 more)

### Community 13 - "Authentication & Security Protocols"
Cohesion: 0.16
Nodes (23): ObjectId, login(), normalize_phone(), post, request_phone_otp(), reset_password(), validate_password(), verify_phone_otp() (+15 more)

### Community 14 - "Authentication & Security Protocols"
Cohesion: 0.17
Nodes (20): API_BASE, API_BASE_URL, API_ENDPOINTS, WS_BASE, ActionButton(), AnalyticsTab(), ConnectedAccountsTab(), InputField() (+12 more)

### Community 15 - "Interactive Analytics Dashboards"
Cohesion: 0.14
Nodes (18): CallGraph(), ComplexityDashboard(), FunctionRow(), GRADE_COLORS, GradeBadge(), MetricCard(), computeDiff(), DiffViewer() (+10 more)

### Community 16 - "Analysis & Inspection Routes"
Cohesion: 0.13
Nodes (23): compare_models(), run_provider(), complexity_analysis_endpoint(), inspect_code_endpoint(), post, Run the same request across multiple AI providers and return side-by-side…, Deterministic local code intelligence without calling an AI provider., Full AST-based complexity analysis â€” pure CS, zero AI. Returns: cognitive… (+15 more)

### Community 17 - "Custom Rules Engine & AST Matcher"
Cohesion: 0.08
Nodes (25): Tests for the Custom Rules Engine., Regex rules with '*' language should apply to any language., Engine should auto-load the YAML rule packs from data/rules/., Empty code should return no violations., Malformed Python should not crash the engine (AST parse fails gracefully)., OWASP pack should flag eval()., OWASP pack should flag exec()., Clean code should not trip OWASP ast_call rules. (+17 more)

### Community 18 - "Authentication & Security Protocols"
Cohesion: 0.14
Nodes (20): HTTPAuthorizationCredentials, _extract_token(), get_current_user(), get_optional_user(), logout(), Request, Response, Accept token via Authorization header OR httpOnly cookie. (+12 more)

### Community 19 - "Code Execution & Sandbox Routes"
Cohesion: 0.14
Nodes (24): evaluate_optimization_endpoint(), _is_code_execution_allowed(), optimize_code_enhanced(), BaseModel, get, post, Request, Execution API routes: /run-code, /run-code/compare, /optimize-code-enhanced,… (+16 more)

### Community 20 - "Report Generation & PDF Export"
Cohesion: 0.15
Nodes (24): generate_tests_endpoint(), GenerateTestsReq, import_local_repo(), import_zip_repo(), ImportLocalReq, provider_status(), BaseModel, get (+16 more)

### Community 21 - "Authentication & Security Protocols"
Cohesion: 0.20
Nodes (23): _build_redirect_uri(), _decode_state(), _encode_state(), facebook_callback(), facebook_start(), github_callback(), github_start(), google_callback() (+15 more)

### Community 22 - "Authentication & Security Protocols"
Cohesion: 0.17
Nodes (16): AuthLayout(), featureLinks, Header(), AuthContext, useAuth(), useTheme(), AuthPage(), ExportOptions() (+8 more)

### Community 23 - "Frontend Feature Components"
Cohesion: 0.11
Nodes (9): TABS, SEVERITY_COLORS, SEVERITY_ICONS, STAGES, SEVERITY_COLORS, AlgorithmVisualizer(), ComparisonVisualizer(), TraceRunner() (+1 more)

### Community 24 - "MongoDB Persistence & Data Layer"
Cohesion: 0.14
Nodes (23): delete_project(), _files_from_doc(), get_file_impact(), get_project(), get_project_analysis(), get_project_dependencies(), get_project_file(), _get_project_or_404() (+15 more)

### Community 25 - "Report Generation & PDF Export"
Cohesion: 0.14
Nodes (12): BytesIO, PDFExportService, Build the profile information section, Service for generating comprehensive PDF exports of user data, Build the analytics section, Setup custom styles for the PDF, Build the sessions summary section, Build the detailed sessions section (+4 more)

### Community 26 - "Monaco Code Editor & Client UI"
Cohesion: 0.09
Nodes (21): name, private, type, version, autoprefixer, chart.js, eslint, eslint-plugin-react (+13 more)

### Community 27 - "Authentication & Security Protocols"
Cohesion: 0.16
Nodes (18): AnalysisPage, App(), AuthPage, BugDetectionPage, CodeOptimizer, DebuggingPage, DocumentationPage, ForgotPasswordPage (+10 more)

### Community 28 - "Repo Importer Services"
Cohesion: 0.12
Nodes (17): fnmatch, pathlib, compress_file_context(), compress_js_ts(), compress_python(), _parse_gitignore(), process_imported_repo(), Any (+9 more)

### Community 29 - "Data Models & Schemas"
Cohesion: 0.12
Nodes (19): pydantic, create_session(), CreateSessionReq, delete_session(), export_sessions(), get_analytics_stats(), get_session(), list_sessions() (+11 more)

### Community 30 - "Step Executor Execution"
Cohesion: 0.15
Nodes (15): BaseModel, post, Request, Algorithm visualization and tracing routes., Trace code execution step-by-step for visualization., trace_algorithm(), TraceReq, Step-by-step algorithm tracer and pattern detector. (+7 more)

### Community 31 - "Crypto Security Encryption"
Cohesion: 0.12
Nodes (19): base64, cryptography_fernet, cryptography_hazmat_primitives, cryptography_hazmat_primitives_kdf_hkdf, hashlib, encrypt_value(), _get_fernet(), Fernet (+11 more)

### Community 32 - "MongoDB Persistence & Data Layer"
Cohesion: 0.14
Nodes (15): redact_secrets_endpoint(), Detect and redact secrets before sending code to AI providers. Supports 20+…, Replace detected secrets with [REDACTED_SECRET] placeholder. Pass…, Redact true secrets from user code before persisting to MongoDB. Gated by…, Count findings by severity., redact_for_storage(), redact_secrets(), _summarize() (+7 more)

### Community 33 - "Package Devdependencies Json"
Cohesion: 0.11
Nodes (19): devDependencies, autoprefixer, eslint, eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, framer-motion, jsdom (+11 more)

### Community 34 - "Rate Limiting & Quota Management"
Cohesion: 0.16
Nodes (17): FastAPI, PipelineReq, BaseModel, post, Review Pipeline Routes., Run the multi-stage review pipeline., run_pipeline(), _check_key() (+9 more)

### Community 35 - "GitHub Integration & Repository Sync"
Cohesion: 0.15
Nodes (5): GitHubService, Any, List branches for a repo, including default branch flag., List contents at a specific branch/ref., Get file content at a specific branch/ref.

### Community 36 - "Data Models & Schemas"
Cohesion: 0.11
Nodes (18): create_project(), post, Create a new project, run initial analysis, and store in MongoDB., DependencyGraphRes, FileItem, ProjectAnalysisRes, ProjectCreateReq, ProjectSummaryRes (+10 more)

### Community 37 - "Analyze Code Rationale"
Cohesion: 0.11
Nodes (17): Tests for the /analyze-code endpoint with fake AI mode., Test analyze-code with bug_detection task., Test analyze-code with explanation task., Test that empty code returns appropriate error., Test specifying a specific provider., Test analyze-code with optimization task returns a fake response., Test optimization with focus areas., Test that code exceeding MAX_CODE_LENGTH is rejected. (+9 more)

### Community 38 - "GitHub Integration & Repository Sync"
Cohesion: 0.18
Nodes (16): difflib, apply_patch_and_open_pr(), ApplyPatchReq, create_pr(), diff_preview(), DiffPreviewReq, get_contents(), get_file() (+8 more)

### Community 39 - "Team Routes Create"
Cohesion: 0.19
Nodes (15): bson, create_share_link(), create_team(), CreateTeamReq, get_shared_session(), get_team_analytics(), invite_to_team(), InviteUserReq (+7 more)

### Community 40 - "MongoDB Persistence & Data Layer"
Cohesion: 0.19
Nodes (15): certifi, pymongo, check_mongodb_connection(), close_mongo_connection(), connect_to_mongo(), init_mongodb(), MongoDB Database Configuration for AI Code Optimizer Reads connection from…, Initialize MongoDB connection (+7 more)

### Community 42 - "Security Core Token"
Cohesion: 0.22
Nodes (10): jwt, passlib_context, extract_user_from_token(), get_token_expiry(), is_token_valid(), JWTManager, Any, datetime (+2 more)

### Community 43 - "Project Analyzer Testdependencygraph"
Cohesion: 0.21
Nodes (6): build_dependency_graph(), impact_of(), Build cross-file dependency graph from import/require statements. Returns: {…, Which files are impacted if this file changes (reverse dependencies)., TestDependencyGraph, TestImpactOf

### Community 44 - "Project Analyzer Services"
Cohesion: 0.19
Nodes (9): put, Update a file's content in a project (e.g., after optimization)., update_project_file(), index_files(), Any, Convert children-dict tree into sorted children-list tree., Build a nested tree structure from a flat file list. Args: files: list of…, _tree_to_list() (+1 more)

### Community 45 - "Custom Rules Engine & AST Matcher"
Cohesion: 0.18
Nodes (9): Clean Code Rules Pack, Modern JavaScript Rules Pack, Performance Rules Pack, Python Style Rules Pack, OWASP Security Rules Pack, Rule, RulesEngine, engine() (+1 more)

### Community 46 - "Sandbox Manager Compare"
Cohesion: 0.22
Nodes (14): compare(), Compare two outputs. Modes ----- exact : str Byte-for-byte comparison (after…, Tests for Docker sandbox, output comparator, and performance profiler., Trailing whitespace per line should be stripped., test_compare_exact_match(), test_compare_exact_mismatch(), test_compare_exact_trailing_whitespace(), test_compare_numeric_count_mismatch() (+6 more)

### Community 47 - "Report Generation & PDF Export"
Cohesion: 0.18
Nodes (13): Request Flow & Architecture Boundary, contextlib, fastapi_staticfiles, check_required_secrets(), Enforce secret quality. If strict=True, raise. If strict=False, only warn.…, debug_db(), health_check(), providers_status() (+5 more)

### Community 48 - "Custom Rules Engine & AST Matcher"
Cohesion: 0.19
Nodes (13): evaluate_rules(), EvaluateReq, BaseModel, post, put, Custom Rules and Linting API Routes., Update active packs and custom rules for a user., Evaluate specific code against a provided list of rules. (+5 more)

### Community 49 - "Data Models & Schemas"
Cohesion: 0.23
Nodes (10): CodeRequest, BaseModel, AIResponse, BaseModel, analyze_code(), optimize_code(), post, DEPRECATED — single routing convention is server/api/*. This module is kept as… (+2 more)

### Community 50 - "Shared React UI Components"
Cohesion: 0.19
Nodes (5): AppErrorBoundary, applyTheme(), ThemeContext, ThemeProvider(), client_src_styles_index

### Community 51 - "Analytics Routes Rationale"
Cohesion: 0.21
Nodes (12): compare_snapshots(), get_history(), get_leaderboard(), get_tech_debt(), get_trends(), get, Analytics & Quality Tracking API Routes., Get recent quality snapshots for the user. (+4 more)

### Community 52 - "Phone Migrations Index"
Cohesion: 0.26
Nodes (8): asyncio, dotenv, motor_motor_asyncio, os, fix_phone_index(), Fix the phone index to allow multiple null values, fix_phone_null_issue(), Remove phone field from all users who have null phone values

### Community 53 - "Frontend Feature Components"
Cohesion: 0.30
Nodes (5): ExportReportPanel(), badgeStyle(), ProofPanel(), GitHubPRPanel(), apiClient

### Community 54 - "Email Service Services"
Cohesion: 0.21
Nodes (11): email_mime_multipart, email_mime_text, _get_resend(), Email delivery service using Resend (with SMTP fallback). Set RESEND_API_KEY…, Send welcome email after registration., Send email via Resend API, SMTP fallback, or dev console., Send password reset email with token link., send_email() (+3 more)

### Community 55 - "API Keys & Provider Configuration"
Cohesion: 0.20
Nodes (11): list_api_keys(), get, post, BYO-API: CRUD endpoints for user-provided AI provider API keys., Test a stored key by making a lightweight API call., Make a cheap API call to verify the key works., List which providers the user has keys configured for (masked)., test_api_key() (+3 more)

### Community 56 - "Analytics Engine & Code Health"
Cohesion: 0.23
Nodes (11): Compute quality score trend over a time range. Parameters ---------- snapshots…, trend(), Tests for the Analytics Engine., Improving scores should have positive slope., Degrading scores should have negative slope., Empty snapshots should return stable., Only snapshots within range should be included., test_trend_degrading() (+3 more)

### Community 57 - "MongoDB Persistence & Data Layer"
Cohesion: 0.18
Nodes (11): calculate_account_age_days(), calculate_profile_completion(), get_avatars_dir(), Any, datetime, Profile Service logic module. Contains helper methods for profile completion…, Resolve and create local avatars storage directory., Calculate account age in days handling timezone awareness. (+3 more)

### Community 58 - "Monaco Code Editor & Client UI"
Cohesion: 0.18
Nodes (11): dependencies, chart.js, jszip, @monaco-editor/react, react, react-chartjs-2, react-dom, react-joyride (+3 more)

### Community 59 - "MongoDB Persistence & Data Layer"
Cohesion: 0.22
Nodes (10): fastapi_testclient, pytest, client(), fixture, Shared test fixtures for the AI Code Optimizer backend. Uses ALLOW_FAKE_AI=1…, Create a FastAPI TestClient with MongoDB skipped., Sample Python code for testing., Sample JavaScript code for testing. (+2 more)

### Community 60 - "Project Analysis Analyzer"
Cohesion: 0.18
Nodes (10): _detect_cycles(), dfs(), get_language_icon(), _parse_imports(), Multi-file project analysis engine. YOUR code â€” no AI. Parses file trees,…, Extract import targets from source code for a given language., Try to resolve an import string to an internal project file path., Detect cycles in the dependency graph using DFS. (+2 more)

### Community 61 - "Report Generation & PDF Export"
Cohesion: 0.38
Nodes (8): html, generate_report_endpoint(), build_session_report(), Any, Generate proof-based session reports in JSON and HTML., _recommendation(), render_html_report(), render_json_report()

### Community 62 - "Report Generation & PDF Export"
Cohesion: 0.20
Nodes (9): io, reportlab_lib, reportlab_lib_enums, reportlab_lib_pagesizes, reportlab_lib_styles, reportlab_lib_units, reportlab_platypus, reportlab_platypus_flowables (+1 more)

### Community 63 - "MongoDB Persistence & Data Layer"
Cohesion: 0.20
Nodes (9): dependencies, mongodb, react-simple-typewriter, scripts, dev, start:client, start:server, mongodb (+1 more)

### Community 64 - "Analytics Engine & Code Health"
Cohesion: 0.24
Nodes (10): compute_quality_score(), Compute a weighted 0â€“100 quality score from an inspection report. Parameters…, _make_report(), Helper to build a realistic inspection report dict., Clean code should score close to 100., Bad code should score well below 50., Score should never exceed 100 or go below 0., test_quality_score_clamped() (+2 more)

### Community 65 - "Health Rationale Endpoint"
Cohesion: 0.20
Nodes (9): Tests for health and config endpoints., Test the supported languages endpoint returns expected structure., Debug endpoints should be blocked in production., Test that CORS headers are set properly (not wildcard)., Test the health endpoint., test_cors_headers(), test_debug_db_not_available_in_production(), test_health_endpoint() (+1 more)

### Community 66 - "Frontend Feature Components"
Cohesion: 0.22
Nodes (7): fadeUp, featurePages, features, samples, slideInLeft, staggerContainer, stats

### Community 67 - "Analysis Repo Scanner"
Cohesion: 0.31
Nodes (8): collections, _chunk_hash(), _detect_language(), Any, Repository-level static analysis from uploaded file trees., Scan a list of {path, content} dicts., _recommendations(), scan_repository()

### Community 68 - "Report Generation & PDF Export"
Cohesion: 0.25
Nodes (8): fastapi_middleware_cors, fastapi_responses, get, Simple PDF Export Test Server Minimal FastAPI server to test PDF export…, Generate a test PDF export, root(), test_pdf_export(), uvicorn

### Community 69 - "MongoDB Persistence & Data Layer"
Cohesion: 0.22
Nodes (5): MongoDB, Close MongoDB connection, Get database instance, MongoDB connection manager for AI Code Optimizer, Connect to MongoDB Atlas with retries and clearer diagnostics

### Community 70 - "Project Analyzer Testaggregatemetrics"
Cohesion: 0.33
Nodes (4): aggregate_metrics(), Run analysis on each file and aggregate project-level metrics. Returns per-file…, Tests for project_analyzer â€” file indexing, dependency graph, metrics., TestAggregateMetrics

### Community 71 - "Project Analyzer Testdetectlanguage"
Cohesion: 0.36
Nodes (3): detect_language(), Detect programming language from file extension., TestDetectLanguage

### Community 72 - "Manifest Public Json"
Cohesion: 0.25
Nodes (7): background_color, display, icons, name, short_name, start_url, theme_color

### Community 73 - "Analytics Engine & Code Health"
Cohesion: 0.25
Nodes (8): estimate_tech_debt(), Estimate tech debt in hours using a documented model. Returns ------- dict…, Clean code should have minimal debt., Security violations should add 4h each., High complexity should add debt hours., test_tech_debt_clean(), test_tech_debt_with_complexity(), test_tech_debt_with_violations()

### Community 75 - "Analytics Engine & Code Health"
Cohesion: 0.29
Nodes (6): datetime, build_snapshot(), Historical Analytics & Quality Tracking Engine. Weighted quality scoring, tech-…, Build a quality snapshot document ready for MongoDB insertion., Snapshot should contain all required fields., test_build_snapshot()

### Community 77 - "Package Scripts Json"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, test

### Community 79 - "MongoDB Persistence & Data Layer"
Cohesion: 0.33
Nodes (6): mongo_diagnostics(), Any, Strip sensitive fields from a user document before returning it to callers., Return basic diagnostics about the current MongoDB connection/topology., redact_user(), debug_mongo()

### Community 80 - "Analytics Engine & Code Health"
Cohesion: 0.33
Nodes (6): diff_snapshots(), Compare two quality snapshots and return per-metric deltas. Parameters…, Deltas should correctly compute differences., Missing metrics in one snapshot should still work., test_diff_snapshots(), test_diff_snapshots_missing_keys()

### Community 81 - "Custom Rules Engine & AST Matcher"
Cohesion: 0.33
Nodes (5): Violation, Violations should decrease the score., Score should never go below 0., test_compliance_score_decreases(), test_compliance_score_floor_at_zero()

### Community 83 - "Eslint Plugin React"
Cohesion: 0.40
Nodes (4): ref_eslint_js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, ref_globals

### Community 84 - "Config Vite Vitest"
Cohesion: 0.50
Nodes (3): ref_path, vite, @vitejs/plugin-react

### Community 85 - "Output Comparator Execution"
Cohesion: 0.40
Nodes (4): re, _parse_floats(), Output comparator â€” compare two execution outputs with different matching…, Extract all floats from a string.

### Community 86 - "Data Models & Schemas"
Cohesion: 0.50
Nodes (4): get_gh_service(), MongoOAuthProvider, OAuth provider document model for MongoDB, Find OAuth access token for a user and provider (decrypted).

### Community 87 - "Rules Routes Rule"
Cohesion: 0.40
Nodes (5): get_rule_packs(), get_user_rules(), get, Get all pre-built rule packs and their rules., Get the active and custom rules for a user.

### Community 88 - "Rate Limiting & Quota Management"
Cohesion: 0.60
Nodes (4): is_rate_limited_error(), Exception, raise_ai_http_error(), Shared helper functions for AI error handling and response formatting.

### Community 90 - "Main Safestaticfiles Staticfiles"
Cohesion: 0.50
Nodes (3): StaticFiles subclass that adds defensive security headers., _SafeStaticFiles, StaticFiles

### Community 91 - "Custom Rules Engine & AST Matcher"
Cohesion: 0.50
Nodes (3): Custom Rules Engine & Linting Policies., RulePattern, yaml

### Community 93 - "Services Analysis Secret"
Cohesion: 0.67
Nodes (3): Any, Convert scan_secrets() output to SARIF 2.1.0 JSON., to_sarif()

## Knowledge Gaps
- **106 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+101 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 650 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `get_database()` connect `User Profile & Account Management` to `API Keys & Provider Configuration`, `API Keys & Provider Configuration`, `Authentication & Security Protocols`, `Authentication & Security Protocols`, `Authentication & Security Protocols`, `Analysis & Inspection Routes`, `Authentication & Security Protocols`, `Authentication & Security Protocols`, `MongoDB Persistence & Data Layer`, `Data Models & Schemas`, `Rate Limiting & Quota Management`, `Data Models & Schemas`, `Team Routes Create`, `MongoDB Persistence & Data Layer`, `Project Analyzer Services`, `Custom Rules Engine & AST Matcher`, `Analytics Routes Rationale`, `API Keys & Provider Configuration`, `MongoDB Persistence & Data Layer`, `Data Models & Schemas`, `Rules Routes Rule`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `analyze_complexity()` connect `Complexity Engine & Metric Calculation` to `Review Pipeline & Multi-Stage Analysis`, `Complexity Engine & Metric Calculation`, `API Keys & Provider Configuration`, `Analysis & Inspection Routes`, `Custom Rules Engine & AST Matcher`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `RulesEngine` connect `Custom Rules Engine & AST Matcher` to `API Keys & Provider Configuration`, `Custom Rules Engine & AST Matcher`, `Custom Rules Engine & AST Matcher`, `Custom Rules Engine & AST Matcher`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _106 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Docker Sandbox & Container Isolation` be split into smaller, more focused modules?**
  _Cohesion score 0.06031746031746032 - nodes in this community are weakly interconnected._
- **Should `Review Pipeline & Multi-Stage Analysis` be split into smaller, more focused modules?**
  _Cohesion score 0.06648575305291723 - nodes in this community are weakly interconnected._
- **Should `API Keys & Provider Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.05920745920745921 - nodes in this community are weakly interconnected._