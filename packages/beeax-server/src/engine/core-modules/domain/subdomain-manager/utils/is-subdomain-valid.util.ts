import { RESERVED_SUBDOMAINS } from 'beeax-shared/constants';
import { isValidTwentySubdomain } from 'beeax-shared/utils';

export const isSubdomainValid = (subdomain: string) => {
  return (
    isValidTwentySubdomain(subdomain) &&
    !RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())
  );
};
