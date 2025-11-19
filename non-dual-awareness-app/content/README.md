# Content Library

This directory contains the contemplative content for the Non-Dual Awareness App, organized for easy integration and use.

## Directory Structure

```
content/
├── README.md                      # This file
├── content-index.json            # Master index of all content
├── daily-pointers.json           # 120 brief daily pointers
├── core-teachings.json           # Deep contemplations by theme
├── self-inquiry-sequences.json   # Guided investigation paths
└── external-resources.json       # Real teacher resources and books
```

## Content Files Overview

### 1. Daily Pointers (`daily-pointers.json`)
- **Count**: 120 pointers
- **Format**: 1-3 sentence pointers for daily contemplation
- **Themes**: awareness, peace, happiness, inquiry, love, self, recognition
- **Usage**: Display one randomly each day, or let users browse
- **Example**: "Notice that you are aware right now. This simple fact of awareness is what you truly are."

### 2. Core Teachings (`core-teachings.json`)
- **Count**: 30+ in-depth teachings
- **Format**: 1-3 paragraphs each, organized by category
- **Categories**:
  - Nature of Awareness (5 teachings)
  - Nature of Experience (5 teachings)
  - Nature of Peace and Happiness (4 teachings)
  - The Pathless Path (3 teachings)
  - Being and Love (3 teachings)
  - Investigation and Inquiry (4 teachings)
  - Living the Understanding (3 teachings)
- **Levels**: foundational, intermediate, advanced
- **Usage**: Topic-based study, deeper contemplation sessions

### 3. Self-Inquiry Sequences (`self-inquiry-sequences.json`)
- **Count**: 10 structured exploration paths
- **Format**: Step-by-step guided inquiries with durations
- **Sequences**:
  1. Who Am I? - Classical Self-Inquiry (15-20 min)
  2. What Is Aware? - Tracing Experience (10-15 min)
  3. Investigating the Separate Self (15-20 min)
  4. The Nature of Thought (10-15 min)
  5. Am I the Body? (15-20 min)
  6. Am I Aware? - Simplest Recognition (5-10 min)
  7. Awareness in Daily Activity (throughout day)
  8. Where Is Happiness? (15-20 min)
  9. Investigating Shared Being (15-20 min)
  10. Welcoming All Experience (15-20 min)
- **Usage**: Guided practice sessions, structured investigation

### 4. External Resources (`external-resources.json`)
- **Teachers**: Rupert Spira, Francis Lucille, Ramana Maharshi, Nisargadatta Maharaj, Jean Klein
- **Books**: Essential and recommended readings with levels
- **Videos**: YouTube channels and online platforms
- **Audio**: Podcasts and audio resources
- **Classical Texts**: Upanishads, Bhagavad Gita, Ashtavakra Gita, etc.
- **Study Paths**: Beginner, Intermediate, Advanced
- **Usage**: External links, recommended resources, future content partnerships

## Content Philosophy

All content is designed to:
1. **Point directly** to the recognition of awareness
2. **Avoid complexity** - keep language simple and clear
3. **Be non-prescriptive** - invite recognition, not belief
4. **Honor the tradition** - draw from authentic Direct Path teachings
5. **Remain practical** - applicable to daily life

## Integration Guidelines

### For App Developers

**Data Format**: All content is in JSON for easy parsing and integration.

**Content Display Recommendations**:
- Use generous white space
- Large, readable fonts
- Minimal UI chrome
- Peaceful color palette
- Optional dark mode

**Features to Support**:
- Random daily pointer on app open
- Browse by theme/category
- Search/filter by level (foundational/intermediate/advanced)
- Bookmark/favorite contemplations
- Timer for guided sequences
- Gentle sound/bell options
- Progress tracking (optional, not mandatory)

**Content Updates**:
- Version numbers in metadata allow for content updates
- New pointers, teachings, and sequences can be added incrementally
- External resources should be updated regularly for accuracy

### For Content Curators

**Adding New Content**:
1. Follow the existing JSON structure
2. Assign appropriate levels (foundational/intermediate/advanced)
3. Use clear, simple language
4. Attribute sources where appropriate
5. Test content for accuracy and clarity
6. Update version numbers

**Quality Standards**:
- Accuracy to non-dual teachings
- Clarity and accessibility
- Non-jargon language when possible
- Direct pointing over philosophical explanation
- Practical applicability

## Permissions and Attribution

### Original Content
The daily-pointers.json, core-teachings.json, and self-inquiry-sequences.json files contain original contemplations inspired by the Direct Path tradition. While inspired by teachers like Rupert Spira and Francis Lucille, these are original formulations for educational purposes.

### External Resources
The external-resources.json file provides references to authentic teacher materials. If integrating actual content from these teachers:
- Obtain proper permissions and licensing
- Provide clear attribution
- Follow fair use guidelines
- Consider partnerships with teachers/publishers

### Recommended Partnerships
For authentic content integration, consider reaching out to:
- Rupert Spira (rupertspira.com)
- Francis Lucille (francislucille.com)
- Non-Duality Press (publishers of many Direct Path books)
- Sahaja Publications (Rupert Spira's publisher)

## Content Roadmap

### Phase 1 (Current)
- ✅ 120 daily pointers
- ✅ 30+ core teachings across 6 categories
- ✅ 10 self-inquiry sequences
- ✅ External resource library

### Phase 2 (Future)
- [ ] Expand to 365+ daily pointers (one per day)
- [ ] Add 50+ more core teachings
- [ ] Create themed contemplation collections
- [ ] Add audio versions of key contemplations
- [ ] Integrate licensed content from teachers

### Phase 3 (Future)
- [ ] Multi-language translations
- [ ] Community-contributed contemplations (curated)
- [ ] Video contemplations
- [ ] Live satsang integrations

## Technical Notes

**File Formats**: JSON for structured data, Markdown for documentation

**Character Encoding**: UTF-8

**Line Endings**: LF (Unix-style)

**Size Considerations**:
- daily-pointers.json: ~35KB
- core-teachings.json: ~60KB
- self-inquiry-sequences.json: ~25KB
- external-resources.json: ~20KB
- Total: ~140KB (very manageable for mobile apps)

**Caching Strategy**:
- Content can be bundled with app (small size)
- Or fetched on first launch and cached locally
- Updates can be fetched periodically

## Usage Examples

### Display a Random Daily Pointer
```javascript
import dailyPointers from './daily-pointers.json';
const randomPointer = dailyPointers.pointers[
  Math.floor(Math.random() * dailyPointers.pointers.length)
];
console.log(randomPointer.text);
```

### Get Foundational Teachings
```javascript
import coreTeachings from './core-teachings.json';
const foundational = coreTeachings.categories
  .flatMap(cat => cat.teachings)
  .filter(t => t.level === 'foundational');
```

### Load an Inquiry Sequence
```javascript
import inquirySequences from './self-inquiry-sequences.json';
const whoAmI = inquirySequences.sequences.find(s => s.id === 'who-am-i');
whoAmI.steps.forEach(step => {
  console.log(`Step ${step.step}: ${step.instruction}`);
});
```

## Maintenance

**Regular Updates**:
- Review content quarterly for accuracy
- Update external resource links (check for broken links)
- Add new content based on user feedback
- Refine existing content for clarity

**Version Control**:
- Track all changes in git
- Use semantic versioning for content updates
- Document changes in commit messages

## Contact

For questions about content, permissions, or contributions:
- See main project README
- Check PLAN.md for project vision and philosophy

---

*"You are already what you seek. This content simply points to that recognition."*
