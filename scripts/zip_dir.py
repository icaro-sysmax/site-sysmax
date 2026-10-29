import sys
import os
import zipfile

def zip_directory(source_dir, output_zip):
    source_dir = os.path.abspath(source_dir)
    output_zip = os.path.abspath(output_zip)
    parent_dir = os.path.dirname(source_dir)

    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, parent_dir)
                zipf.write(file_path, rel_path)

    print(f"ZIP criado com sucesso em: {output_zip}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python3 zip_dir.py <source_dir> <output_zip>")
        sys.exit(1)
    zip_directory(sys.argv[1], sys.argv[2])
