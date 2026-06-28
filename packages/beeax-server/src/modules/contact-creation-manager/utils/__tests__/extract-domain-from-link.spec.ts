import { extractDomainFromLink } from 'src/modules/contact-creation-manager/utils/extract-domain-from-link.util';

describe('extractDomainFromLink', () => {
  it('should extract domain from link', () => {
    const link = 'https://www.beeax.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('beeax.com');
  });

  it('should extract domain from link without www', () => {
    const link = 'https://beeax.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('beeax.com');
  });

  it('should extract domain from link without protocol', () => {
    const link = 'beeax.com';
    const result = extractDomainFromLink(link);

    expect(result).toBe('beeax.com');
  });

  it('should extract domain from link with path', () => {
    const link = 'https://beeax.com/about';
    const result = extractDomainFromLink(link);

    expect(result).toBe('beeax.com');
  });
});
