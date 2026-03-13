import fitz
import os

pdf_path = r'c:\Users\ASHWIN\Downloads\Rakshana Website\Rakshana24_7.pdf'
output_dir = r'c:\Users\ASHWIN\Downloads\Rakshana Website\extracted_images'
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# Extract text
with open(r'c:\Users\ASHWIN\Downloads\Rakshana Website\design_text.txt', 'w', encoding='utf-8') as f:
    for i, page in enumerate(doc):
        f.write(f"--- PAGE {i+1} ---\n")
        f.write(page.get_text())
        f.write("\n\n")

print(f"Total pages: {len(doc)}")
print("Text saved to design_text.txt")

# Extract images
img_count = 0
for i, page in enumerate(doc):
    images = page.get_images(full=True)
    for j, img in enumerate(images):
        xref = img[0]
        try:
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            img_filename = f"page{i+1}_img{j+1}.{image_ext}"
            img_path = os.path.join(output_dir, img_filename)
            with open(img_path, "wb") as img_file:
                img_file.write(image_bytes)
            img_count += 1
            print(f"Saved: {img_filename} ({len(image_bytes)} bytes)")
        except Exception as e:
            print(f"Error extracting image on page {i+1}, img {j+1}: {e}")

print(f"\nTotal images extracted: {img_count}")
doc.close()
