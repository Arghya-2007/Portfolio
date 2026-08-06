const fs = require('fs');
let content = fs.readFileSync('components/sections/Hero.tsx', 'utf8');

// Remove framer-motion import
content = content.replace(/import \{ motion \} from 'framer-motion'\r?\n/, '');

// Remove mobileRevealVariants
content = content.replace(/const mobileRevealVariants = \{[\s\S]*?\}\r?\n/, '');

// Replace RoleCycler props (remove initial, animate, exit, transition)
content = content.replace(/\s+initial=\{\{ y: "100%" \}\}\r?\n\s+animate=\{\{ y: 0 \}\}\r?\n\s+exit=\{\{ y: "-120%" \}\}\r?\n/g, '\n');
content = content.replace(/\s+transition=\{\{ type: "spring", damping: 25, stiffness: 300 \}\}\r?\n/g, '\n');

// Update MobileLayout signature to include useEffect and useRef
content = content.replace(/function MobileLayout\(\{ frames \}: MobileLayoutProps\) \{\r?\n\s+const lenis = useLenis\(\)/, 
`function MobileLayout({ frames }: MobileLayoutProps) {
  const lenis = useLenis()
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.mobile-reveal')
    if (!elements) return
    elements.forEach((el) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
      )
    })
  }, [])`
);

// Add ref to container section
content = content.replace(/<section\r?\n\s+id="hero"/, '<section\n        ref={containerRef}\n        id="hero"');

// Replace all <motion.something variants={mobileRevealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}> with normal tags
content = content.replace(/<motion\.(div|h1|p)([\s\S]*?)variants=\{mobileRevealVariants\}[\s\S]*?viewport=\{\{ once: true \}\}/g, function(match, tag, rest) {
    if (rest.includes('className="')) {
        return `<${tag}${rest.replace(/className="/, 'className="mobile-reveal ')}`;
    } else {
        return `<${tag}${rest}className="mobile-reveal"`;
    }
});

// Replace ending tags
content = content.replace(/<\/motion\.div>/g, '</div>');
content = content.replace(/<\/motion\.h1>/g, '</h1>');
content = content.replace(/<\/motion\.p>/g, '</p>');

fs.writeFileSync('components/sections/Hero.tsx', content);
