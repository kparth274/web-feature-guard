// Helper to find available feature IDs in web-features
// This helps debug and discover correct feature IDs

import webFeaturesData from 'web-features/data.json';

const features = webFeaturesData.features;

export const findFeatureId = (searchTerm: string): string[] => {
  const results: string[] = [];
  
  for (const [id, feature] of Object.entries(features)) {
    if ('name' in feature) {
      const name = feature.name.toLowerCase();
      const idLower = id.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      
      if (name.includes(searchLower) || idLower.includes(searchLower)) {
        results.push(id);
      }
    }
  }
  
  return results;
};

export const listAllFeatures = (): string[] => {
  return Object.keys(features);
};

// Log some key features for debugging
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('=== Available Web Features (sample) ===');
  console.log('Clipboard:', findFeatureId('clipboard'));
  console.log('Array.at:', findFeatureId('at'));
  console.log('StructuredClone:', findFeatureId('clone'));
  console.log('Scroll snap:', findFeatureId('snap'));
  console.log('Aspect ratio:', findFeatureId('aspect'));
}
