import subprocess
import sys
import os
import time

def main():
    # Get the directory where app.py is located
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, 'backend')
    frontend_dir = os.path.join(root_dir, 'frontend')
    
    # Path to the python executable being used
    python_exe = sys.executable

    print("==============================================")
    print("  Starting Rakshana 24/7 Unified Server")
    print("==============================================")
    
    # 1. Start Backend
    print("[1] Starting Backend API Server (Port 5000)...")
    # We use subprocess.Popen to start it as a background process tied to this script
    try:
        backend_process = subprocess.Popen([python_exe, 'run.py'], cwd=backend_dir)
    except Exception as e:
        print(f"Failed to start backend: {e}")
        return

    # 2. Start Frontend
    print("[2] Starting Frontend Local Server (Port 80)...")
    try:
        frontend_process = subprocess.Popen([python_exe, '-m', 'http.server', '80'], cwd=frontend_dir)
    except Exception as e:
        print(f"Failed to start frontend: {e}")
        backend_process.terminate()
        return
    
    print("\n✓ Both servers are now running!")
    print("→ Frontend accessible at: http://localhost")
    print("→ Backend accessible at:  http://localhost:5000")
    print("\nPress Ctrl+C to stop both servers gracefully.")
    print("==============================================\n")
    
    # Small delay to ensure servers start before browser opens
    time.sleep(2)
    
    # Automatically open the browser
    try:
        if sys.platform == 'win32':
            os.startfile('http://localhost')
        elif sys.platform == 'darwin':
            subprocess.Popen(['open', 'http://localhost'])
        else:
            subprocess.Popen(['xdg-open', 'http://localhost'])
    except Exception:
        print("Note: Could not open browser automatically. Please manually open http://localhost")

    # Keep script alive and monitor processes
    try:
        while True:
            time.sleep(1)
            # If either process stops/crashes, cleanly exit
            if backend_process.poll() is not None:
                print("\n[!] Backend API server stopped unexpectedly.")
                break
            if frontend_process.poll() is not None:
                print("\n[!] Frontend Local server stopped unexpectedly.")
                break
    except KeyboardInterrupt:
        print("\n\nShutting down servers...")
    finally:
        # Guarantee both processes are killed when app.py closes
        print("Stopping backend...")
        backend_process.terminate()
        print("Stopping frontend...")
        frontend_process.terminate()
        print("All servers stopped successfully. Goodbye!")

if __name__ == '__main__':
    main()
