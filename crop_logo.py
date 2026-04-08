from PIL import Image

try:
    im = Image.open('assets/gp_logo.png')
    im = im.convert("RGBA")
    
    # getbbox() on RGBA crops fully transparent pixels
    bbox = im.getbbox()
    if bbox:
        im_cropped = im.crop(bbox)
        im_cropped.save('assets/gp_logo_cropped.png')
        print(f"Successfully cropped from {im.size} to {im_cropped.size}. Bounding box: {bbox}")
    else:
        print("No bounding box found / image is totally transparent.")
except Exception as e:
    print(f"Error: {e}")
