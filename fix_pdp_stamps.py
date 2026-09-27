import re

with open('src/components/ProductDetailPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

pdp_stamps = '''
      {/* Background Vintage Stamps for PDP */}
      <img src="/assets/stamps/stamp2.png" style={{ position: "absolute", top: "15%", left: "3%", width: "clamp(70px, 8vw, 110px)", transform: "rotate(-12deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp5.png" style={{ position: "absolute", top: "40%", right: "4%", width: "clamp(60px, 7vw, 95px)", transform: "rotate(18deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp1.png" style={{ position: "absolute", bottom: "30%", left: "5%", width: "clamp(75px, 9vw, 105px)", transform: "rotate(-25deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
      <img src="/assets/stamps/stamp4.png" style={{ position: "absolute", bottom: "5%", right: "8%", width: "clamp(65px, 8vw, 90px)", transform: "rotate(15deg)", opacity: 0.5, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
'''

# Check if stamps are already injected to avoid duplicates
if "Background Vintage Stamps for PDP" not in content:
    content = content.replace('<div className="product-detail-page-container">', '<div className="product-detail-page-container" style={{ position: "relative" }}>\n' + pdp_stamps)

with open('src/components/ProductDetailPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
