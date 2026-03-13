import os
import re

def slice_html():
    frontend_dir = r"c:\Users\ASHWIN\Downloads\Rakshana Website\frontend"
    index_path = os.path.join(frontend_dir, "index.html")
    
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Find the sections using regex. We look for the start and end of regions.
    # The structure generally has <!-- ========== NAME ========== -->
    parts = re.split(r'<!-- ========== (.*?) ========== -->', html)
    
    # parts[0] is everything BEFORE the first separator.
    # parts is a list like: [prelude, section_name1, section_content1, section_name2, section_content2, ...]
    
    sections = {}
    prelude = parts[0]
    
    for i in range(1, len(parts), 2):
        name = parts[i].strip()
        content = parts[i+1]
        sections[name] = content

    # New Navbar links:
    nav_links_html = """
      <div class="nav-links" id="navLinks">
        <a href="index.html">Home</a>
        <a href="how-it-works.html">How It Works</a>
        <a href="legal.html">Legal Rights</a>
        <a href="scan.html">Scan</a>
        <a href="report.html">Report</a>
      </div>

      <div class="nav-cta" id="navCta">
        <button class="btn btn-ghost" id="btnSignIn" onclick="window.location.href='auth.html'">Sign In</button>
        <button class="btn btn-primary" id="btnGetProtected" onclick="window.location.href='dashboard.html'">My Dashboard</button>
      </div>
"""
    # Replace the nav links and CTA in the NAVIGATION section.
    nav_content = sections.get("NAVIGATION", "")
    nav_content = re.sub(r'<div class="nav-links".*?<button class="mobile-menu-toggle"', 
                         nav_links_html + '\n      <button class="mobile-menu-toggle"', 
                         nav_content, flags=re.DOTALL)
    
    # We will build base page wrapper:
    # head + nav + warning banner + push prompt + toast ...
    # warning banner, push prompt, toast are in some sections or at the end.
    
    # Let's extract the closing wrapper from FOOTER content
    footer_content = sections.get("FOOTER", "")
    
    faq_section = """
  <!-- ========== FAQ SECTION ========== -->
  <section class="faq-section" id="faq" style="background: var(--bg-secondary); padding: var(--space-16) 0;">
    <div class="container">
      <div class="section-header reveal">
        <p class="section-label">FAQ</p>
        <h2 class="section-title">Common Questions</h2>
      </div>
      <div class="faq-grid" style="display:grid; grid-template-columns: 1fr; gap: var(--space-4); max-width: 800px; margin: 0 auto;">
        <div class="faq-card glass-card reveal">
          <h3 style="margin-bottom:var(--space-2); color:var(--text-primary);">Is my data really anonymous?</h3>
          <p style="color:var(--text-secondary);">Yes. All personal information like phone numbers and facial data is one-way hashed and encrypted using AES-256 before analysis. We do not store raw files.</p>
        </div>
        <div class="faq-card glass-card reveal">
          <h3 style="margin-bottom:var(--space-2); color:var(--text-primary);">How does the NLP scanning work?</h3>
          <p style="color:var(--text-secondary);">The threat scorer doesn't just look at keywords; it evaluates context. It distinguishes between a friendly mention and malicious doxxing, accurately mapping threats to laws like the IT Act and IPC.</p>
        </div>
        <div class="faq-card glass-card reveal">
          <h3 style="margin-bottom:var(--space-2); color:var(--text-primary);">Does this replace police reports?</h3>
          <p style="color:var(--text-secondary);">No. Rakshana acts as your early warning system and evidence collector. The 'Report' feature helps you securely and anonymously submit this evidence directly to the National Cyber Crime portal.</p>
        </div>
      </div>
    </div>
  </section>
"""

    def build_page(title, body_sections):
        # Prelude has title tag.
        page_html = prelude.replace("<title>Rakshana 24/7 — Proactive Digital Safety for Women</title>", f"<title>Rakshana 24/7 — {title}</title>")
        page_html += "<!-- ========== NAVIGATION ========== -->" + nav_content
        page_html += "<!-- ========== WARNING ALERT BANNER ========== -->" + sections.get("WARNING ALERT BANNER", "")
        page_html += "<!-- ========== PUSH NOTIFICATION PROMPT ========== -->" + sections.get("PUSH NOTIFICATION PROMPT", "")
        
        for name, item_html in body_sections:
            page_html += f"<!-- ========== {name} ========== -->" + item_html
            
        page_html += "<!-- ========== FOOTER ========== -->" + footer_content
        return page_html

    # HOME PAGE (index.html)
    home_sections = [
        ("HERO SECTION", sections.get("HERO SECTION", "")),
        ("THE REALITY / PROBLEM", sections.get("THE REALITY / PROBLEM", "")),
        ("SOLUTION / FEATURES", sections.get("SOLUTION / FEATURES", "")),
        ("FAQ SECTION", faq_section),
        ("CTA SECTION", sections.get("CTA SECTION", ""))
    ]
    with open(os.path.join(frontend_dir, "index.html"), "w", encoding="utf-8") as f:
        f.write(build_page("Home", home_sections))

    # HOW IT WORKS
    hiw_sections = [
        ("PIPELINE / HOW IT WORKS", sections.get("PIPELINE / HOW IT WORKS", "").replace('id="how-it-works"', 'id="how-it-works" style="padding-top: var(--space-24)"')),
        ("CTA SECTION", sections.get("CTA SECTION", ""))
    ]
    with open(os.path.join(frontend_dir, "how-it-works.html"), "w", encoding="utf-8") as f:
        f.write(build_page("How It Works", hiw_sections))

    # DASHBOARD
    dash_sections = [
        ("LIVE DASHBOARD DEMO", sections.get("LIVE DASHBOARD DEMO", "").replace('id="dashboard-preview"', 'id="dashboard-preview" style="padding-top: var(--space-24)"')),
        ("NOTIFICATION CENTER", sections.get("NOTIFICATION CENTER", ""))
    ]
    with open(os.path.join(frontend_dir, "dashboard.html"), "w", encoding="utf-8") as f:
        f.write(build_page("My Dashboard", dash_sections))

    # SCAN
    scan_sections = [
        ("THREAT SCANNER — Upload & Analyze", sections.get("THREAT SCANNER — Upload & Analyze", "").replace('id="scanner"', 'id="scanner" style="padding-top: var(--space-24)"'))
    ]
    with open(os.path.join(frontend_dir, "scan.html"), "w", encoding="utf-8") as f:
        f.write(build_page("Threat Scanner", scan_sections))

    # LEGAL
    legal_sections = [
        ("LEGAL RIGHTS", sections.get("LEGAL RIGHTS", "").replace('id="legal"', 'id="legal" style="padding-top: var(--space-24)"'))
    ]
    with open(os.path.join(frontend_dir, "legal.html"), "w", encoding="utf-8") as f:
        f.write(build_page("Legal Reference", legal_sections))

    # REPORT
    report_sections = [
        ("ANONYMOUS REPORT", sections.get("ANONYMOUS REPORT", "").replace('id="report"', 'id="report" style="padding-top: var(--space-24)"'))
    ]
    with open(os.path.join(frontend_dir, "report.html"), "w", encoding="utf-8") as f:
        f.write(build_page("Anonymous Report", report_sections))

if __name__ == "__main__":
    slice_html()
    print("Slicing complete.")
