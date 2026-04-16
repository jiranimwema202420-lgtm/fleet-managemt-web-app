#!/usr/bin/env python3
"""Simple static preview server for environments where Next.js deps are unavailable."""

from __future__ import annotations

import argparse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run FleetPulse static preview server")
    parser.add_argument("--host", default="0.0.0.0", help="Bind host, default: 0.0.0.0")
    parser.add_argument("--port", type=int, default=4173, help="Bind port, default: 4173")
    parser.add_argument(
      "--directory",
      default=str(Path(__file__).resolve().parents[1]),
      help="Root directory to serve (repo root by default)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    handler = lambda *h_args, **h_kwargs: SimpleHTTPRequestHandler(*h_args, directory=args.directory, **h_kwargs)
    server = ThreadingHTTPServer((args.host, args.port), handler)

    print(f"FleetPulse static preview running at http://{args.host}:{args.port}/preview/index.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down preview server...")
        server.shutdown()


if __name__ == "__main__":
    main()
