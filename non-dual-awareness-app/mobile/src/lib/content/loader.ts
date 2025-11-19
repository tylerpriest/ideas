/**
 * Content Loader
 * Loads contemplation content from JSON files
 */

// Import content files
import dailyPointersData from '../../../content/daily-pointers.json';
import coreTeachingsData from '../../../content/core-teachings.json';
import inquirySequencesData from '../../../content/self-inquiry-sequences.json';
import externalResourcesData from '../../../content/external-resources.json';

// Types
export interface DailyPointer {
  id: number;
  text: string;
  theme: string;
  attribution?: string;
}

export interface Teaching {
  id: string;
  title: string;
  content: string;
  theme: string;
  level: 'foundational' | 'intermediate' | 'advanced';
}

export interface TeachingCategory {
  id: string;
  title: string;
  description: string;
  teachings: Teaching[];
}

export interface InquiryStep {
  step: number;
  instruction: string;
  duration: string;
}

export interface InquirySequence {
  id: string;
  title: string;
  description: string;
  level: 'foundational' | 'intermediate' | 'advanced';
  estimated_duration: string;
  steps: InquiryStep[];
}

// Content loaders
export class ContentLoader {
  private static instance: ContentLoader;

  private dailyPointers: DailyPointer[] = [];
  private coreTeachings: TeachingCategory[] = [];
  private inquirySequences: InquirySequence[] = [];
  private externalResources: any = null;

  private constructor() {
    this.loadContent();
  }

  static getInstance(): ContentLoader {
    if (!ContentLoader.instance) {
      ContentLoader.instance = new ContentLoader();
    }
    return ContentLoader.instance;
  }

  private loadContent() {
    try {
      // Load daily pointers
      if (dailyPointersData && dailyPointersData.pointers) {
        this.dailyPointers = dailyPointersData.pointers;
      }

      // Load core teachings
      if (coreTeachingsData && coreTeachingsData.categories) {
        this.coreTeachings = coreTeachingsData.categories;
      }

      // Load inquiry sequences
      if (inquirySequencesData && inquirySequencesData.sequences) {
        this.inquirySequences = inquirySequencesData.sequences;
      }

      // Load external resources
      if (externalResourcesData) {
        this.externalResources = externalResourcesData;
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    }
  }

  // Daily Pointers
  getAllPointers(): DailyPointer[] {
    return this.dailyPointers;
  }

  getPointerById(id: number): DailyPointer | undefined {
    return this.dailyPointers.find((p) => p.id === id);
  }

  getPointerByIndex(index: number): DailyPointer | undefined {
    return this.dailyPointers[index % this.dailyPointers.length];
  }

  getRandomPointer(): DailyPointer {
    const randomIndex = Math.floor(Math.random() * this.dailyPointers.length);
    return this.dailyPointers[randomIndex];
  }

  getPointersByTheme(theme: string): DailyPointer[] {
    return this.dailyPointers.filter((p) => p.theme === theme);
  }

  getTodayPointer(lastIndex: number): { pointer: DailyPointer; index: number } {
    const nextIndex = (lastIndex + 1) % this.dailyPointers.length;
    return {
      pointer: this.dailyPointers[nextIndex],
      index: nextIndex,
    };
  }

  // Core Teachings
  getAllTeachingCategories(): TeachingCategory[] {
    return this.coreTeachings;
  }

  getCategoryById(id: string): TeachingCategory | undefined {
    return this.coreTeachings.find((c) => c.id === id);
  }

  getTeachingById(categoryId: string, teachingId: string): Teaching | undefined {
    const category = this.getCategoryById(categoryId);
    return category?.teachings.find((t) => t.id === teachingId);
  }

  getTeachingsByLevel(level: 'foundational' | 'intermediate' | 'advanced'): Teaching[] {
    const allTeachings: Teaching[] = [];
    this.coreTeachings.forEach((category) => {
      category.teachings.forEach((teaching) => {
        if (teaching.level === level) {
          allTeachings.push(teaching);
        }
      });
    });
    return allTeachings;
  }

  searchTeachings(query: string): Teaching[] {
    const lowercaseQuery = query.toLowerCase();
    const results: Teaching[] = [];

    this.coreTeachings.forEach((category) => {
      category.teachings.forEach((teaching) => {
        if (
          teaching.title.toLowerCase().includes(lowercaseQuery) ||
          teaching.content.toLowerCase().includes(lowercaseQuery)
        ) {
          results.push(teaching);
        }
      });
    });

    return results;
  }

  // Inquiry Sequences
  getAllSequences(): InquirySequence[] {
    return this.inquirySequences;
  }

  getSequenceById(id: string): InquirySequence | undefined {
    return this.inquirySequences.find((s) => s.id === id);
  }

  getSequencesByLevel(level: 'foundational' | 'intermediate' | 'advanced'): InquirySequence[] {
    return this.inquirySequences.filter((s) => s.level === level);
  }

  // External Resources
  getExternalResources(): any {
    return this.externalResources;
  }

  // Statistics
  getContentStats() {
    return {
      dailyPointers: this.dailyPointers.length,
      categories: this.coreTeachings.length,
      teachings: this.coreTeachings.reduce((sum, cat) => sum + cat.teachings.length, 0),
      sequences: this.inquirySequences.length,
    };
  }
}

// Export singleton instance
export const contentLoader = ContentLoader.getInstance();
