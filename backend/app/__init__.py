# ============================================
# RAKSHANA 24/7 — Flask Application Factory
# ============================================

import os

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy

from config import config_by_name

# ─── Extensions (initialised once, bound to app in factory) ───
db = SQLAlchemy()
jwt = JWTManager()
socketio = SocketIO(cors_allowed_origins="*", async_mode="threading")


def create_app(config_name: str | None = None) -> Flask:
    """Application factory — creates and configures the Flask instance."""

    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

    # Determine frontend path
    frontend_dir = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "..", "frontend")
    )

    app = Flask(
        __name__,
        static_folder=frontend_dir,
        static_url_path="",
    )
    app.config.from_object(config_by_name[config_name])

    # ── Initialise extensions ──
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, origins="*", supports_credentials=True)
    socketio.init_app(app)

    # ── Serve frontend index.html at root ──
    @app.route("/")
    def serve_frontend():
        return app.send_static_file("index.html")

    # ── Register blueprints ──
    from app.routes.auth import auth_bp
    from app.routes.users import users_bp
    from app.routes.alerts import alerts_bp
    from app.routes.reports import reports_bp
    from app.routes.scan import scan_bp
    from app.routes.dashboard import dashboard_bp
    from app.routes.legal import legal_bp
    from app.routes.health import health_bp
    from app.routes.i18n import i18n_bp

    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(alerts_bp, url_prefix="/api/alerts")
    app.register_blueprint(reports_bp, url_prefix="/api/reports")
    app.register_blueprint(scan_bp, url_prefix="/api/scan")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")
    app.register_blueprint(legal_bp, url_prefix="/api/legal")
    app.register_blueprint(i18n_bp, url_prefix="/api/i18n")

    # ── Create tables on first request ──
    with app.app_context():
        from app.models import user, alert, scan_result, report  # noqa: F401

        db.create_all()

    # ── JWT error handlers ──
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return {"error": "Token has expired", "code": "TOKEN_EXPIRED"}, 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return {"error": "Invalid token", "code": "INVALID_TOKEN"}, 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return {"error": "Authorization required", "code": "AUTH_REQUIRED"}, 401

    return app
