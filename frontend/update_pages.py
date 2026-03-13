import os
import re

files = ['scan.html', 'report.html', 'legal.html', 'how-it-works.html', 'dashboard.html', 'auth.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Add CSS link
    content = re.sub(r'(<link\s+rel="stylesheet"\s+href="styles\.css\?v=\d+">)', r'\1\n  <link rel="stylesheet" href="voice-assistant.css?v=1">', content)
    
    # Add JS script
    content = re.sub(r'(<script\s+src="app\.js\?v=\d+"></script>)', r'\1\n  <script src="voice-assistant.js?v=1"></script>', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Updated {f}")
