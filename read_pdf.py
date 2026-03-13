import fitz
doc = fitz.open(r'c:\Users\ASHWIN\Downloads\Rakshana Website\Rakshana247_PRD.pdf')
with open(r'c:\Users\ASHWIN\Downloads\Rakshana Website\prd_text.txt', 'w', encoding='utf-8') as f:
    for i, page in enumerate(doc):
        f.write(f"--- PAGE {i+1} ---\n")
        f.write(page.get_text())
        f.write("\n\n")
doc.close()
print("Done! Text saved to prd_text.txt")
