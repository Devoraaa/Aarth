import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Hero Section
hero_stamps = '''{/* Vintage Stamps - Hero Section */}
            <img src="/assets/stamps/stamp1.png" style={{ position: "absolute", top: "12%", left: "4%", width: "clamp(60px, 8vw, 100px)", transform: "rotate(-8deg)", opacity: 0.5, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img src="/assets/stamps/stamp2.png" style={{ position: "absolute", bottom: "35%", right: "3%", width: "clamp(70px, 9vw, 110px)", transform: "rotate(12deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img src="/assets/stamps/stamp5.png" style={{ position: "absolute", bottom: "10%", left: "8%", width: "clamp(80px, 10vw, 120px)", transform: "rotate(-15deg)", opacity: 0.6, mixBlendMode: "multiply", zIndex: 2, pointerEvents: "none" }} alt="Vintage Stamp Bottom Left" />
            <img src="/assets/stamps/stamp3.png" style={{ position: "absolute", top: "25%", right: "12%", width: "clamp(55px, 7vw, 90px)", transform: "rotate(25deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
'''
content = re.sub(r'\{\/\* Vintage Stamps - Hero Section \*\/\}.*?alt="Vintage Stamp" \/>\s*<img src="\/assets\/stamps\/stamp2.png".*?alt="Vintage Stamp" \/>', hero_stamps.strip(), content, flags=re.DOTALL)

# Fix Products Section
prod_stamps = '''{/* Vintage Stamps - Products Section */}
            <img src="/assets/stamps/stamp3.png" style={{ position: "absolute", top: "180px", left: "2%", width: "clamp(65px, 8vw, 100px)", transform: "rotate(-15deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img src="/assets/stamps/stamp4.png" style={{ position: "absolute", bottom: "250px", right: "2%", width: "clamp(55px, 7vw, 90px)", transform: "rotate(18deg)", opacity: 0.45, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img src="/assets/stamps/stamp1.png" style={{ position: "absolute", top: "450px", right: "5%", width: "clamp(75px, 9vw, 110px)", transform: "rotate(-12deg)", opacity: 0.5, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img src="/assets/stamps/stamp2.png" style={{ position: "absolute", top: "50%", left: "1%", width: "clamp(85px, 10vw, 120px)", transform: "rotate(5deg)", opacity: 0.35, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img src="/assets/stamps/stamp5.png" style={{ position: "absolute", bottom: "100px", left: "6%", width: "clamp(60px, 8vw, 95px)", transform: "rotate(-25deg)", opacity: 0.6, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
            <img src="/assets/stamps/stamp3.png" style={{ position: "absolute", top: "75%", right: "8%", width: "clamp(70px, 8vw, 105px)", transform: "rotate(30deg)", opacity: 0.4, mixBlendMode: "multiply", zIndex: 0, pointerEvents: "none" }} alt="Vintage Stamp" />
'''
content = re.sub(r'\{\/\* Vintage Stamps - Products Section \*\/\}.*?alt="Vintage Stamp" \/>\s*<img src="\/assets\/stamps\/stamp4.png".*?alt="Vintage Stamp" \/>', prod_stamps.strip(), content, flags=re.DOTALL)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
