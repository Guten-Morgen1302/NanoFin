import subprocess
import time
import webbrowser
import os
import sys
from pathlib import Path

class NanoFinLauncher:
    def __init__(self):
        self.models = {
            "Local Credit Analysis": {
                "file": "Local_Credit_Analysis.py",
                "port": 8501,
                "description": "Local credit analysis without external APIs"
            },
            "Customer View": {
                "file": "Customer_View.py", 
                "port": 8502,
                "description": "Customer-facing credit assessment"
            },
            "Customer View (Gemini)": {
                "file": "Customer_View_Goolge_Gemini_GoogleBNBMarathon.py",
                "port": 8503, 
                "description": "Enhanced customer view with Gemini AI"
            },
            "Financial Institution View": {
                "file": "Financial_InstitutionView.py",
                "port": 8504,
                "description": "Bank/lender perspective dashboard"
            },
            "Business Review Platform": {
                "file": "Business_Review_Insights_Platform.py",
                "port": 8505,
                "description": "Business insights and review platform"
            },
            "Enhanced Loan Marketplace": {
                "file": "Enhanced_NanoFin_Loan_Marketplace.py", 
                "port": 8506,
                "description": "Comprehensive loan marketplace"
            },
            "Nano Entrepreneur Assessment": {
                "file": "Nano_Entrepreneur_CreditFlow_Loan_Assessment.py",
                "port": 8507,
                "description": "Specialized nano-entrepreneur analysis"
            }
        }
        self.processes = {}
        self.ai_models_dir = Path(__file__).parent

    def print_banner(self):
        print("=" * 60)
        print("NANOFIN AI MODELS LAUNCHER")
        print("=" * 60)
        print("Starting all AI models simultaneously...")
        print()

    def check_dependencies(self):
        """Check if required dependencies are installed"""
        try:
            import streamlit
            print("[OK] Streamlit found")
        except ImportError:
            print("[ERROR] Streamlit not found. Installing...")
            subprocess.run([sys.executable, "-m", "pip", "install", "streamlit"])
        
        try:
            import pandas
            print("[OK] Pandas found")
        except ImportError:
            print("[ERROR] Pandas not found. Installing...")
            subprocess.run([sys.executable, "-m", "pip", "install", "pandas"])

    def start_model(self, name, model_info):
        """Start a single Streamlit model"""
        file_path = self.ai_models_dir / model_info["file"]
        
        if not file_path.exists():
            print(f"[WARNING] {name}: File {model_info['file']} not found, skipping...")
            return False
            
        print(f"[STARTING] {name} on port {model_info['port']}...")
        
        try:
            # Start Streamlit process
            process = subprocess.Popen([
                sys.executable, "-m", "streamlit", "run", 
                str(file_path),
                "--server.port", str(model_info['port']),
                "--server.headless", "true",
                "--browser.gatherUsageStats", "false"
            ], 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            cwd=str(self.ai_models_dir)
            )
            
            self.processes[name] = {
                'process': process,
                'port': model_info['port'],
                'url': f"http://localhost:{model_info['port']}"
            }
            
            print(f"[SUCCESS] {name} started successfully on port {model_info['port']}")
            return True
            
        except Exception as e:
            print(f"[ERROR] Failed to start {name}: {str(e)}")
            return False

    def start_all_models(self):
        """Start all AI models"""
        self.print_banner()
        self.check_dependencies()
        
        print(f"\n[INFO] Available Models:")
        for i, (name, info) in enumerate(self.models.items(), 1):
            print(f"[{i}] {name} - {info['description']}")
        
        print(f"\n[STARTING] {len(self.models)} AI models...")
        print("-" * 60)
        
        success_count = 0
        for name, model_info in self.models.items():
            if self.start_model(name, model_info):
                success_count += 1
            time.sleep(2)  # Wait between starts to avoid conflicts
        
        print("-" * 60)
        print(f"[SUCCESS] Successfully started {success_count}/{len(self.models)} models")
        
        if success_count > 0:
            self.show_access_info()
            self.open_browsers()
        
        return success_count

    def show_access_info(self):
        """Display access information for all running models"""
        print("\n[INFO] Access URLs:")
        print("-" * 60)
        for name, process_info in self.processes.items():
            print(f"[MODEL] {name:<30} {process_info['url']}")
        
        print("\n[TIPS]")
        print("• Wait 30-60 seconds for all models to fully load")
        print("• Each model runs independently on its own port")
        print("• Use Ctrl+C to stop this launcher")
        print("• Models will continue running in background")

    def open_browsers(self):
        """Open browser tabs for all running models"""
        print(f"\n[BROWSER] Opening {len(self.processes)} browser tabs...")
        
        for name, process_info in self.processes.items():
            try:
                webbrowser.open(process_info['url'])
                time.sleep(1)  # Small delay between opens
            except Exception as e:
                print(f"[WARNING] Could not open browser for {name}: {e}")

    def monitor_processes(self):
        """Monitor running processes"""
        print("\n[MONITOR] Monitoring processes... (Press Ctrl+C to stop)")
        try:
            while True:
                running_count = 0
                for name, process_info in self.processes.items():
                    if process_info['process'].poll() is None:
                        running_count += 1
                    else:
                        print(f"[WARNING] {name} has stopped")
                
                if running_count == 0:
                    print("[ERROR] All processes have stopped")
                    break
                    
                time.sleep(10)  # Check every 10 seconds
                
        except KeyboardInterrupt:
            print("\n[STOP] Stopping all processes...")
            self.stop_all_processes()

    def stop_all_processes(self):
        """Stop all running processes"""
        for name, process_info in self.processes.items():
            try:
                process_info['process'].terminate()
                print(f"[STOPPED] {name}")
            except Exception as e:
                print(f"[WARNING] Error stopping {name}: {e}")

    def run(self):
        """Main execution method"""
        try:
            success_count = self.start_all_models()
            if success_count > 0:
                self.monitor_processes()
        except KeyboardInterrupt:
            print("\n[STOP] Launcher interrupted by user")
            self.stop_all_processes()
        except Exception as e:
            print(f"[ERROR] Unexpected error: {e}")
            self.stop_all_processes()

def main():
    launcher = NanoFinLauncher()
    launcher.run()

if __name__ == "__main__":
    main()