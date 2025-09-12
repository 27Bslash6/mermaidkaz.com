# MermaidKaz 🧜‍♀️

> **Professional website for Tasmania's first PADI Mermaid Instructor**

A modern, accessible, and booking-focused website showcasing professional mermaid services including PADI certification courses, entertainment, and signature retreat experiences.

[![Deploy Status](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange)](https://mermaidkaz.pages.dev)
[![Built with Eleventy](https://img.shields.io/badge/Built%20with-Eleventy-blue)](https://11ty.dev)
[![Package Manager](https://img.shields.io/badge/Package%20Manager-Bun-yellow)](https://bun.sh)
[![Content Management](https://img.shields.io/badge/CMS-Decap-green)](https://decapcms.org)

## 🌊 About This Project

**MermaidKaz** represents Tasmania's pioneering mermaid instruction business, offering:

- **PADI Mermaid Certification Courses** (Basic, Mermaid, Advanced)
- **Professional Mermaid Entertainment** for parties and events
- **Signature 3-Day Retreats** ($1800 comprehensive experience)
- **Photography Sessions** and consultation services

### 🎯 Key Features

- **Professional Branding**: Ocean-inspired design with accessibility-first approach
- **Real Content**: Authentic information about Kaz's 17-year teaching background
- **Easy Booking**: Integrated TidyCal scheduling system
- **Content Management**: Decap CMS for easy updates
- **SEO Optimized**: Structured data and performance optimizations
- **Mobile-First**: Responsive design with PWA capabilities

---

## 🛠️ Tech Stack

**Frontend Framework**: [Eleventy](https://11ty.dev) (Static Site Generator)
**Package Manager**: [Bun](https://bun.sh) (Ultra-fast JavaScript runtime & package manager)
**Styling**: [PicoCSS](https://picocss.com) + Custom Mermaid Theme
**Content Management**: [Decap CMS](https://decapcms.org) (formerly Netlify CMS)
**Hosting**: [Cloudflare Pages](https://pages.cloudflare.com)
**Booking System**: [TidyCal](https://tidycal.com) Integration
**CI/CD**: GitHub Actions

### 📦 Dependencies

```json
{
  "dependencies": {
    "@11ty/eleventy": "^2.0.1",
    "@11ty/eleventy-img": "^4.0.2",
    "@picocss/pico": "^2.0.6",
    "nunjucks": "^3.2.4",
    "markdown-it": "^14.1.0"
  }
}
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **Bun** 1.0+ (faster package manager)
- **Git** for version control
- **GitHub account** for CMS authentication
- **Cloudflare account** for hosting (optional for local development)

> **📦 Why Bun?** This project uses [Bun](https://bun.sh) for faster package management and better TypeScript support. Bun is 2-10x faster than npm for installing packages!

### 1. Install Bun (if not already installed)

```bash
# Install Bun globally
curl -fsSL https://bun.sh/install | bash

# Or with npm if you have it
npm install -g bun
```

### 2. Clone & Install

```bash
git clone https://github.com/username/mermaidkaz.git
cd mermaidkaz
bun install
```

### 3. Local Development

```bash
# Start development server (faster with bun!)
bun start

# Open browser to http://localhost:8080
```

### 4. Build for Production

```bash
# Production build (faster with bun!)
bun run build:prod

# Test production build locally
bun run build && bunx http-server _site
```

---

## 📁 Project Structure

```
mermaidkaz/
├── 📂 .github/workflows/     # GitHub Actions CI/CD
│   └── deploy.yml           # Cloudflare Pages deployment
├── 📂 src/                  # Source files
│   ├── 📂 _data/           # Site data (JSON)
│   │   ├── site.json       # Site configuration & branding
│   │   └── navigation.json # Navigation structure
│   ├── 📂 _includes/       # Nunjucks components
│   │   ├── service-card.njk
│   │   └── testimonial.njk
│   ├── 📂 _layouts/        # Page templates
│   │   ├── base.njk        # Base HTML structure
│   │   └── page.njk        # Page layout
│   ├── 📂 admin/           # Decap CMS
│   │   ├── index.html      # CMS interface
│   │   └── config.yml      # CMS configuration
│   ├── 📂 assets/          # Static assets
│   │   ├── 📂 css/         # Stylesheets
│   │   ├── 📂 js/          # JavaScript
│   │   └── 📂 images/      # Images & media
│   ├── 📄 index.md         # Homepage content
│   ├── 📄 about.md         # About page
│   ├── 📄 services.md      # Services page
│   ├── 📄 contact.md       # Contact page
│   └── 📄 manifest.json    # PWA manifest
├── 📂 _site/               # Generated static site (ignored)
├── 📄 .eleventy.js         # Eleventy configuration
├── 📄 package.json         # Dependencies & scripts
└── 📄 README.md           # This file
```

---

## 🚀 Available Scripts

All scripts run faster with Bun:

```bash
# Development
bun start                    # Start dev server with live reload
bun run dev                  # Alias for bun start (shorter command)
bun run build               # Build for development
bun run build:prod          # Build for production (optimized)
bun run clean               # Clean build directory
bun run preview             # Build and preview production locally

# Testing & Quality
bun run test                # Run all tests (HTML validation + accessibility)
bun run test:html           # Validate HTML markup
bun run test:accessibility  # Run accessibility tests with pa11y
bun run lint                # Lint JavaScript files with ESLint
bun run format              # Format code with Prettier

# Utilities
bun run debug               # Debug Eleventy build process
bun run optimize:images     # Optimize images with Eleventy Image
bun run install:clean       # Clean install (removes node_modules & lockfile)
bun run verify:bun          # Verify bun installation and build process
```

> **🏎️ Performance Tip**: Bun is significantly faster than npm. You'll notice the speed difference especially during `bun install` and when running multiple scripts!

### 🔄 Migrating from npm to Bun

If you previously used npm, here's your migration checklist:

1. **Install Bun**: `curl -fsSL https://bun.sh/install | bash`
2. **Clean Install**: `bun run install:clean` (removes old npm files)
3. **Verify Setup**: `bun run verify:bun` (tests installation and build)
4. **Update Muscle Memory**: Replace `npm` with `bun` in your commands
5. **Enjoy Speed**: Everything runs faster now!

**Command Translation:**

```bash
# Old (npm)           →  New (bun)
npm install          →  bun install
npm start            →  bun start
npm run build        →  bun run build
npm test             →  bun test
npx some-package     →  bunx some-package
```

---

## ⚙️ Configuration

### 🔧 Site Configuration

Edit `src/_data/site.json` to update:

```json
{
  "title": "MermaidKaz - Tasmania's First PADI Mermaid Instructor",
  "tagline": "Magic above and below the water",
  "social": {
    "instagram": "https://www.instagram.com/mermaid_kaz/",
    "facebook": "https://www.facebook.com/p/Mermaid-Kaz-61553609431660/"
  },
  "booking": {
    "tidycal_url": "https://tidycal.com/mermaidkaz"
  }
}
```

### 🎨 Theme Customization

The mermaid theme uses CSS custom properties in `src/assets/css/main.css`:

```css
:root {
  --mermaid-primary: #1b4f72; /* Deep Ocean Blue */
  --mermaid-secondary: #a8e6cf; /* Sea Foam Green */
  --mermaid-accent: #f39c12; /* Coral Gold */
}
```

### 📝 Content Management

Access the CMS at `/admin/` (requires GitHub authentication):

1. **Pages**: Home, About, Services, Contact
2. **Services**: Individual service offerings
3. **Testimonials**: Client reviews and feedback
4. **Blog Posts**: News and updates
5. **Site Settings**: Configuration and social links

---

## 🚀 Deployment

### Automated Deployment (Recommended)

1. **Fork this repository** to your GitHub account

2. **Set up Cloudflare Pages**:

   - Go to Cloudflare Dashboard > Pages
   - Connect to GitHub repository
   - Set build command: `npm run build:prod`
   - Set output directory: `_site`

3. **Configure secrets** in GitHub repository settings:

   ```
   CLOUDFLARE_API_TOKEN: Your Cloudflare API token
   CLOUDFLARE_ACCOUNT_ID: Your Cloudflare account ID
   ```

4. **Push to main branch** - deployment happens automatically!

### Manual Deployment

```bash
# Build site
npm run build:prod

# Upload _site/ folder to your hosting provider
```

---

## 🔧 Development

### Available Scripts

```bash
npm start          # Development server with hot reload
npm run build      # Production build
npm run build:prod # Production build with optimizations
npm run clean      # Remove build artifacts
npm run test       # Run tests (HTML validation + accessibility)
npm run lint       # Lint JavaScript
npm run format     # Format code with Prettier
```

### 🧪 Testing

```bash
# HTML validation
npm run test:html

# Accessibility testing
npm run test:accessibility

# All tests
npm test
```

### 🐛 Debugging

```bash
# Debug Eleventy build process
npm run debug

# Verbose logging
DEBUG=Eleventy* npm start
```

---

## 🎨 Design System

### Color Palette

- **Primary**: `#1B4F72` - Deep Ocean Blue (headers, links)
- **Secondary**: `#A8E6CF` - Sea Foam Green (accents, highlights)
- **Accent**: `#F39C12` - Coral Gold (call-to-action, pricing)

### Typography

- **Font Family**: Poppins (Google Fonts)
- **Headings**: 600-700 weight, gradient text effects
- **Body**: 400 weight, 1.7 line-height for readability

### Accessibility

- **WCAG 2.1 AA** compliant color contrasts
- **Keyboard navigation** fully supported
- **Screen reader** optimized with ARIA labels
- **Focus indicators** clearly visible
- **Reduced motion** support for animations

---

## 📊 Performance

### Optimization Features

- **Image Optimization**: WebP format with fallbacks
- **CSS**: Critical path optimization + minification
- **JavaScript**: ES6+ with graceful degradation
- **Caching**: Service worker + browser caching
- **Compression**: Gzip/Brotli at CDN level

### Core Web Vitals Targets

- **LCP**: < 2.5s (Hero image optimization)
- **FID**: < 100ms (Minimal JavaScript)
- **CLS**: < 0.1 (Fixed layouts, proper sizing)

---

## 🔒 Security & Privacy

### Content Security Policy

```
default-src 'self';
style-src 'self' 'unsafe-inline' fonts.googleapis.com;
font-src 'self' fonts.gstatic.com;
img-src 'self' data: https:;
script-src 'self' identity.netlify.com unpkg.com;
```

### Privacy Features

- **No tracking cookies** by default
- **GDPR compliant** contact forms
- **Secure headers** via Cloudflare
- **HTTPS only** in production

---

## 🤝 Contributing

### Getting Started

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** and test locally
4. **Commit changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request**

### Code Style

- **Prettier** for code formatting
- **ESLint** for JavaScript linting
- **Semantic commits** (feat, fix, docs, style, etc.)
- **Accessibility-first** development approach

---

## 📋 Roadmap

### Phase 1 - Launch (Completed ✅)

- [x] Basic site structure with all pages
- [x] Professional mermaid branding & design
- [x] TidyCal booking integration
- [x] Decap CMS content management
- [x] Cloudflare Pages deployment
- [x] Mobile-responsive design
- [x] Accessibility compliance (WCAG 2.1 AA)

### Phase 2 - Enhancement (Future)

- [ ] Advanced booking features
- [ ] Client portal for course materials
- [ ] Multi-language support (EN/DE)
- [ ] E-commerce for mermaid merchandise
- [ ] Advanced analytics integration
- [ ] Newsletter subscription system

### Phase 3 - Growth (Future)

- [ ] Franchise/instructor network
- [ ] Online course platform
- [ ] Mobile app development
- [ ] API for third-party integrations

---

## 📞 Support

### For Website Issues

- **Create an issue** on GitHub
- **Email**: tech-support@mermaidkaz.com

### For Mermaid Services

- **Book directly**: [TidyCal](https://tidycal.com/mermaidkaz)
- **Email**: info@mermaidkaz.com
- **Instagram**: [@mermaid_kaz](https://www.instagram.com/mermaid_kaz/)
- **Facebook**: [Mermaid Kaz](https://www.facebook.com/p/Mermaid-Kaz-61553609431660/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Kaz** - Tasmania's pioneering mermaid instructor and client
- **PADI** - Professional Association of Diving Instructors
- **Eleventy Community** - Amazing static site generator
- **PicoCSS** - Minimal CSS framework
- **Cloudflare** - Reliable hosting and CDN

---

<div align="center">

**🧜‍♀️ Made with magic for Tasmania's mermaid community 🧜‍♀️**

[Visit Live Site](https://mermaidkaz.pages.dev) • [Book a Session](https://tidycal.com/mermaidkaz) • [Follow on Instagram](https://www.instagram.com/mermaid_kaz/)

</div>
