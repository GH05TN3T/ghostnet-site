# CyborgJedi Portfolio Website

A modern, responsive portfolio website for cyborgjedi.com featuring GitHub integration and sleek UI design.

## 🚀 Features

- **Modern Design**: Dark theme with cyberpunk aesthetics
- **Responsive Layout**: Works perfectly on all devices
- **GitHub Integration**: Automatically displays latest repositories
- **Interactive Elements**: Smooth animations and transitions
- **Contact Form**: Direct email integration
- **XML Configuration**: Structured data management
- **SEO Optimized**: Meta tags and semantic HTML

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome 6
- **Fonts**: Inter & JetBrains Mono
- **API**: GitHub REST API v3
- **Deployment**: Ready for Cloudflare Pages

## 📁 Project Structure

```
ghostnet-site/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── config.xml          # XML configuration file
├── README.md           # Project documentation
└── assets/             # Images and media files
```

## 🎨 Design Features

### Color Scheme
- **Primary**: #00d4ff (Cyan)
- **Secondary**: #ff6b35 (Orange)
- **Accent**: #7c3aed (Purple)
- **Background**: #0a0a0a (Dark)
- **Text**: #ffffff (White)

### Typography
- **Primary Font**: Inter (Modern, clean)
- **Monospace**: JetBrains Mono (Code blocks)

### Animations
- Smooth scroll navigation
- Fade-in animations on scroll
- Typing animation for hero title
- Floating particle background
- Interactive hover effects

## 🔧 Configuration

The website uses an XML configuration file (`config.xml`) for easy customization:

```xml
<portfolio>
    <metadata>
        <title>CyborgJedi Portfolio</title>
        <domain>cyborgjedi.com</domain>
        <github>GH05TN3T</github>
    </metadata>
    <!-- More configuration options -->
</portfolio>
```

## 📱 Responsive Design

- **Desktop**: Full-featured layout with side-by-side content
- **Tablet**: Adjusted grid layouts and spacing
- **Mobile**: Single-column layout with hamburger menu

## 🔗 GitHub Integration

Automatically fetches and displays:
- Latest 6 repositories
- Repository descriptions
- Programming languages
- Star/fork counts
- Live demo links (if available)

## 🚀 Deployment

### Cloudflare Pages Setup

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `# No build needed`
3. Set output directory: `/`
4. Configure custom domain: `cyborgjedi.com`
5. Enable SSL and CDN

### Local Development

```bash
# Serve locally (Python)
python3 -m http.server 8000

# Or use any static file server
npx serve .
```

## 📧 Contact Form

The contact form uses `mailto:` links to open the user's default email client with pre-filled information.

## 🎯 Performance

- **Lightweight**: Minimal dependencies
- **Fast Loading**: Optimized assets
- **SEO Friendly**: Semantic HTML structure
- **Accessible**: WCAG compliant

## 🔒 Security

- No server-side code required
- Static file hosting
- HTTPS enforced
- No sensitive data exposure

## 📈 Analytics

Ready for integration with:
- Google Analytics
- Cloudflare Analytics
- Custom tracking solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test responsiveness
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- GitHub API for repository data
- Cloudflare for hosting and CDN

---

**Built with ❤️ by CyborgJedi**
