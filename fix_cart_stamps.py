import re

with open('src/components/CartDrawer.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

cart_stamps = '''
        {/* Background Vintage Stamps for Cart */}
        <img src="/assets/stamps/stamp2.png" style={{ position: "absolute", top: "5%", left: "10%", width: "clamp(60px, 8vw, 90px)", transform: "rotate(-15deg)", opacity: 0.25, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
        <img src="/assets/stamps/stamp5.png" style={{ position: "absolute", top: "45%", right: "5%", width: "clamp(75px, 9vw, 105px)", transform: "rotate(20deg)", opacity: 0.3, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
        <img src="/assets/stamps/stamp3.png" style={{ position: "absolute", bottom: "15%", left: "8%", width: "clamp(55px, 7vw, 85px)", transform: "rotate(-25deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
'''

if "Background Vintage Stamps for Cart" not in content:
    content = content.replace('<div\n        className="cart-drawer-panel"\n        onClick={(e) => e.stopPropagation()}\n        role="dialog"\n        aria-modal="true"\n        aria-label="Your Bag"\n      >', '<div\n        className="cart-drawer-panel"\n        onClick={(e) => e.stopPropagation()}\n        role="dialog"\n        aria-modal="true"\n        aria-label="Your Bag"\n        style={{ position: "relative", overflow: "hidden" }}\n      >\n' + cart_stamps)

with open('src/components/CartDrawer.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
