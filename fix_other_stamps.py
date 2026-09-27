import re

# Add stamps to CollectionPage
with open('src/components/CollectionPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

coll_stamps = '''
      {/* Background Vintage Stamps for Collection */}
      <img src="/assets/stamps/stamp3.png" style={{ position: "absolute", top: "10%", left: "4%", width: "clamp(65px, 8vw, 100px)", transform: "rotate(14deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp1.png" style={{ position: "absolute", top: "45%", right: "3%", width: "clamp(75px, 9vw, 110px)", transform: "rotate(-18deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp4.png" style={{ position: "absolute", bottom: "15%", left: "6%", width: "clamp(55px, 7vw, 90px)", transform: "rotate(22deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
'''
if "Background Vintage Stamps for Collection" not in content:
    content = content.replace('<div className="collection-page-container">', '<div className="collection-page-container" style={{ position: "relative", overflow: "hidden" }}>\n' + coll_stamps)
with open('src/components/CollectionPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Add stamps to StoriesPage
with open('src/components/StoriesPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

stories_stamps = '''
      {/* Background Vintage Stamps for Stories */}
      <img src="/assets/stamps/stamp5.png" style={{ position: "absolute", top: "20%", right: "5%", width: "clamp(70px, 8vw, 105px)", transform: "rotate(-25deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp2.png" style={{ position: "absolute", bottom: "20%", left: "4%", width: "clamp(60px, 8vw, 95px)", transform: "rotate(15deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
'''
if "Background Vintage Stamps for Stories" not in content:
    content = content.replace('<div className="stories-page-container">', '<div className="stories-page-container" style={{ position: "relative", overflow: "hidden" }}>\n' + stories_stamps)
with open('src/components/StoriesPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

