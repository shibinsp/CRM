// Every external destination the site links to, in one place. Sections and
// data files never inline these.
export const SITE_URLS: Record<
  | 'appWelcome'
  | 'calBooking'
  | 'discord'
  | 'docsDevelopers'
  | 'docsGettingStarted'
  | 'docsUserGuide'
  | 'github'
  | 'linkedin'
  | 'trustCenter'
  | 'x',
  string
> = {
  appWelcome: 'https://app.beeax.com/welcome',
  calBooking: 'https://cal.com/forms/f7841033-0a20-4958-8c92-4e34ec128a81',
  discord: 'https://discord.gg/cx5n4Jzs57',
  docsDevelopers: 'https://docs.beeax.com/developers/introduction',
  docsGettingStarted: 'https://docs.beeax.com/getting-started/introduction',
  docsUserGuide: 'https://docs.beeax.com/user-guide/introduction',
  github: 'https://github.com/beeax/beeax',
  linkedin: 'https://www.linkedin.com/company/beeax',
  trustCenter: 'https://trust.beeax.com',
  x: 'https://x.com/beeaxcrm',
};
