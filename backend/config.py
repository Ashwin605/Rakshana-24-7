# ============================================
# RAKSHANA 24/7 — Application Configuration
# ============================================

import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()


class BaseConfig:
    """Base configuration shared across all environments."""

    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "rakshana-dev-secret-change-in-production")

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///rakshana.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False

    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "rakshana-jwt-secret")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        seconds=int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))
    )
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(
        seconds=int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES", 2592000))
    )
    JWT_TOKEN_LOCATION = ["headers"]
    JWT_HEADER_NAME = "Authorization"
    JWT_HEADER_TYPE = "Bearer"

    # Encryption (AES-256)
    ENCRYPTION_KEY = os.getenv(
        "ENCRYPTION_KEY", "rakshana-aes-256-key-must-be-32-bytes!!"
    )

    # Redis / Celery
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
    CELERY_RESULT_BACKEND = os.getenv(
        "CELERY_RESULT_BACKEND", "redis://localhost:6379/1"
    )

    # Telegram
    TELEGRAM_API_ID = os.getenv("TELEGRAM_API_ID", "")
    TELEGRAM_API_HASH = os.getenv("TELEGRAM_API_HASH", "")
    TELEGRAM_PHONE = os.getenv("TELEGRAM_PHONE", "")
    TELEGRAM_CHANNELS = [
        ch.strip()
        for ch in os.getenv("TELEGRAM_CHANNELS", "").split(",")
        if ch.strip()
    ]

    # Twilio
    TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
    TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
    TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "")
    TWILIO_WHATSAPP_FROM = os.getenv(
        "TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886"
    )

    # Scan / Threat Thresholds
    SCAN_INTERVAL_HOURS = int(os.getenv("SCAN_INTERVAL_HOURS", 4))
    THREAT_WATCH_THRESHOLD = int(os.getenv("THREAT_WATCH_THRESHOLD", 40))
    THREAT_ALERT_THRESHOLD = int(os.getenv("THREAT_ALERT_THRESHOLD", 70))
    THREAT_CRITICAL_THRESHOLD = int(os.getenv("THREAT_CRITICAL_THRESHOLD", 90))

    # CORS
    CORS_ORIGINS = [
        o.strip()
        for o in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    ]


class DevelopmentConfig(BaseConfig):
    """Development configuration — SQLite, debug on."""

    DEBUG = True
    SQLALCHEMY_ECHO = True


class ProductionConfig(BaseConfig):
    """Production configuration — PostgreSQL, debug off."""

    DEBUG = False
    SQLALCHEMY_ECHO = False


class TestingConfig(BaseConfig):
    """Testing configuration — in-memory SQLite."""

    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"


# Config map
config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
}
