# Icônes PWA

Pour générer les icônes PNG à partir du fichier SVG :

1. Utilisez un outil en ligne comme [Real Favicon Generator](https://realfavicongenerator.net/)
2. Ou utilisez un outil comme ImageMagick :

```bash
# Installer ImageMagick si nécessaire
# sudo apt install imagemagick

# Générer les différentes tailles
convert icon.svg -resize 72x72 icon-72x72.png
convert icon.svg -resize 96x96 icon-96x96.png
convert icon.svg -resize 128x128 icon-128x128.png
convert icon.svg -resize 144x144 icon-144x144.png
convert icon.svg -resize 152x152 icon-152x152.png
convert icon.svg -resize 192x192 icon-192x192.png
convert icon.svg -resize 384x384 icon-384x384.png
convert icon.svg -resize 512x512 icon-512x512.png
```

3. Ou utilisez un outil comme sharp avec Node.js

Les tailles requises sont :
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512
