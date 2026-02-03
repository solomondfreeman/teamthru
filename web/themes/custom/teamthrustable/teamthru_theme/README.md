# TeamThru Drupal 11 Theme

An HHS-style responsive theme for TeamThru - a Minority & Veteran Owned Small Business specializing in Application Modernization and Cloud Engineering.

## Requirements

- Drupal 10.3+ or Drupal 11
- No base theme required (standalone theme)

## Installation

1. Download and extract the theme to your Drupal installation's `themes/custom` directory:
   ```
   /themes/custom/teamthru_theme/
   ```

2. Enable the theme via the Drupal admin interface:
   - Go to Appearance (`/admin/appearance`)
   - Find "TeamThru Theme" and click "Install and set as default"

3. Clear the Drupal cache:
   ```bash
   drush cr
   ```

## Theme Regions

The theme provides the following regions:

| Region | Description |
|--------|-------------|
| `gov_banner` | Government-style banner at top of page |
| `header` | Main header area |
| `header_search` | Search form in header |
| `primary_menu` | Main navigation menu |
| `hero` | Hero section (front page) |
| `highlighted` | Highlighted content area |
| `breadcrumb` | Breadcrumb navigation |
| `content_top` | Above main content |
| `content` | Main content area |
| `content_bottom` | Below main content |
| `sidebar_first` | Left sidebar |
| `sidebar_second` | Right sidebar |
| `footer_brand` | Footer brand/description |
| `footer_first` | Footer column 1 |
| `footer_second` | Footer column 2 |
| `footer_third` | Footer column 3 |
| `footer_social` | Social media links |
| `footer_bottom` | Footer bottom (legal links) |

## Configuration

### Setting Up the Main Menu

1. Go to Structure → Menus → Main navigation
2. Add your menu items
3. The menu will automatically appear in the primary navigation area

### Adding Logo

The theme includes default logos in `/images/`:
- `logo-white.png` - White version for header/footer
- `logo.png` - Color version

To use custom logos, replace these files or configure via:
- Appearance → TeamThru Theme → Settings → Logo image

### Front Page Hero

The front page includes a default hero section. To customize:

1. Create a custom block with your hero content
2. Place it in the "Hero" region
3. Or edit the `page--front.html.twig` template

## CSS Architecture

The theme uses CSS custom properties (variables) for easy customization:

```css
:root {
  /* Brand Colors */
  --tt-navy: #1A3A5C;
  --tt-navy-dark: #142D47;
  --tt-teal: #2EBCB0;
  --tt-teal-light: #3DD4C7;
  --tt-teal-dark: #249B91;
  --tt-blue: #1976D2;
  
  /* Spacing */
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Typography */
  --font-family: 'Source Sans Pro', sans-serif;
}
```

### CSS Files

- `css/base.css` - Reset and base styles
- `css/layout.css` - Layout and grid systems
- `css/components/` - Component styles (header, footer, navigation, etc.)
- `css/theme.css` - Theme-specific overrides

## JavaScript

The theme includes the following JavaScript behaviors:

- **Navigation** - Mobile menu toggle, dropdown handling
- **Back to Top** - Scroll-to-top button
- **Accordion** - Expandable content sections
- **Smooth Scroll** - Smooth scrolling for anchor links

## Customization

### Creating Child Theme

For major customizations, create a child theme:

```yaml
# mytheme.info.yml
name: My Custom Theme
type: theme
base theme: teamthru_theme
core_version_requirement: ^10.3 || ^11
```

### Overriding Templates

Copy any template from `templates/` to your child theme and modify as needed.

### Adding Custom CSS

Add custom styles to your child theme or create additional CSS files and add them to `libraries.yml`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Credits

- Theme developed for TeamThru
- Based on HHS.gov design patterns
- Uses Source Sans Pro font from Google Fonts

## License

Proprietary - All rights reserved by TeamThru.
