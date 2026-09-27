import re

# Update App.tsx
with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change all zIndex: \d+ to zIndex: 0 for all stamps
content = re.sub(r'zIndex:\s*\d+', 'zIndex: 0', content)
with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Update ProductDetailPage.tsx
with open('src/components/ProductDetailPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'zIndex:\s*\d+', 'zIndex: 0', content)
with open('src/components/ProductDetailPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Update CollectionPage.tsx
with open('src/components/CollectionPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'zIndex:\s*\d+', 'zIndex: 0', content)
with open('src/components/CollectionPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Update StoriesPage.tsx
with open('src/components/StoriesPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(r'zIndex:\s*\d+', 'zIndex: 0', content)
with open('src/components/StoriesPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

