from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images"

original = Image.open(IMAGE_DIR / "16.webp").convert("RGB")
clean_source = Image.open(IMAGE_DIR / "16-bg.webp").convert("RGB")

if clean_source.size != original.size:
    clean_source = clean_source.resize(original.size, Image.Resampling.LANCZOS)

mask = Image.new("L", original.size, 0)
draw = ImageDraw.Draw(mask)

# Replace only the pixels that were hidden beneath the live copy and CTA.
regions = [
    (68, 186, 390, 260),   # ONLINE LEARNING
    (30, 232, 748, 346),   # product name and leaf mark
    (30, 306, 770, 444),   # supporting copy
    (34, 482, 486, 594),   # white label
    (44, 540, 426, 674),   # orange CTA
]

for region in regions:
    draw.rounded_rectangle(region, radius=24, fill=255)

# Feather joins so the untouched original photo remains visually continuous.
mask = mask.filter(ImageFilter.GaussianBlur(9))
plate = Image.composite(clean_source, original, mask)
plate.save(IMAGE_DIR / "16-bg-matched.webp", "WEBP", quality=94, method=6)
