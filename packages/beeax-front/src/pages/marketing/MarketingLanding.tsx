import { styled } from '@linaria/react';
import { AppPath } from 'beeax-shared/types';
import { useNavigate } from 'react-router-dom';

// BeeAX brand palette (from the Beeax AI Tech brand kit)
const GOLD = '#D4A017';
const GOLD_LIGHT = '#F5C542';
const GOLD_DARK = '#B8860B';
const CREAM = '#FDF5E6';
const CREAM_CARD = '#FFF8E7';
const INK = '#1A1A1A';
const NAVY = '#1E2A3A';
const BODY = '#6B7280';
const LOGO_URL = '/images/icons/android/android-launchericon-192-192.png';

const StyledPage = styled.div`
  background: ${CREAM};
  color: ${INK};
  height: 100dvh;
  overflow-y: auto;
  width: 100%;
`;

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1120px;
  padding: 20px 24px;
`;

const StyledBrand = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  gap: 10px;
  letter-spacing: -0.02em;
`;

const StyledBrandLogo = styled.img`
  border-radius: 10px;
  height: 36px;
  width: 36px;
`;

const StyledGhostButton = styled.button`
  background: transparent;
  border: 1px solid rgba(28, 28, 28, 0.16);
  border-radius: 8px;
  color: ${INK};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 9px 18px;
  transition: border-color 0.15s ease;
  &:hover {
    border-color: ${GOLD};
  }
`;

const StyledPrimaryButton = styled.button`
  background: ${INK};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  padding: 13px 26px;
  transition: background 0.15s ease;
  &:hover {
    background: #000000;
  }
`;

const StyledGoldButton = styled.button`
  background: ${GOLD};
  border: none;
  border-radius: 8px;
  color: ${INK};
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 26px;
  transition: background 0.15s ease;
  &:hover {
    background: ${GOLD_LIGHT};
  }
`;

const StyledHero = styled.section`
  margin: 0 auto;
  max-width: 1120px;
  padding: 72px 24px 56px;
  text-align: center;
`;

const StyledEyebrow = styled.div`
  color: ${GOLD_DARK};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const StyledHeroLogo = styled.img`
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(212, 160, 23, 0.28);
  height: 104px;
  margin-bottom: 28px;
  width: 104px;
`;

const StyledH1 = styled.h1`
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0 auto 20px;
  max-width: 760px;
  @media (max-width: 640px) {
    font-size: 38px;
  }
`;

const StyledGoldText = styled.span`
  background: linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, #e07020);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledSubtitle = styled.p`
  color: ${BODY};
  font-size: 19px;
  line-height: 1.55;
  margin: 0 auto 36px;
  max-width: 600px;
`;

const StyledCtaRow = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledBand = styled.div`
  background: linear-gradient(90deg, #f5d547, #f0c040, #e8a030, #e07020, #c83020);
  height: 6px;
  margin: 8px auto 0;
  max-width: 1120px;
  border-radius: 999px;
`;

const StyledFeatures = styled.section`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  max-width: 1120px;
  padding: 64px 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.div`
  background: ${CREAM_CARD};
  border: 1px solid rgba(28, 28, 28, 0.06);
  border-radius: 16px;
  padding: 28px;
`;

const StyledCardIcon = styled.div`
  align-items: center;
  background: ${GOLD};
  border-radius: 12px;
  color: ${INK};
  display: flex;
  font-size: 22px;
  height: 44px;
  justify-content: center;
  margin-bottom: 16px;
  width: 44px;
`;

const StyledCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px;
`;

const StyledCardBody = styled.p`
  color: ${BODY};
  font-size: 15px;
  line-height: 1.55;
  margin: 0;
`;

const StyledClosing = styled.section`
  background: ${NAVY};
  color: #ffffff;
  margin: 0 auto;
  max-width: 1120px;
  border-radius: 24px;
  padding: 56px 24px;
  text-align: center;
`;

const StyledClosingTitle = styled.h2`
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
`;

const StyledClosingText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 17px;
  margin: 0 auto 28px;
  max-width: 520px;
`;

const StyledFooter = styled.footer`
  color: ${BODY};
  font-size: 13px;
  padding: 40px 24px 56px;
  text-align: center;
`;

const FEATURES = [
  {
    icon: '🗂️',
    title: 'Objects & fields, your way',
    body: 'Model any business with custom objects and fields. Every record is first-class, with a real API behind it.',
  },
  {
    icon: '⚡',
    title: 'Workflows & automation',
    body: 'Trigger actions on any event. Build pipelines visually and let BeeAX handle the busywork.',
  },
  {
    icon: '🤖',
    title: 'AI agents built in',
    body: 'Native AI agents draft, summarize, and act on your CRM data — an AI-native CRM, not a bolt-on.',
  },
  {
    icon: '📊',
    title: 'Views for everyone',
    body: 'Table, kanban, and calendar views with filters, sorts, and grouping. See your pipeline the way you think.',
  },
  {
    icon: '✉️',
    title: 'Email & calendar sync',
    body: 'Connect Gmail or Microsoft and keep every conversation and meeting on the timeline automatically.',
  },
  {
    icon: '🔒',
    title: 'Permissions that scale',
    body: 'Object-, field-, and row-level access control so the right people see exactly the right data.',
  },
];

export const MarketingLanding = () => {
  const navigate = useNavigate();
  const goToLogin = () => navigate(AppPath.SignInUpV2);

  return (
    <StyledPage>
      <StyledNav>
        <StyledBrand>
          <StyledBrandLogo src={LOGO_URL} alt="BeeAX" />
          BeeAX CRM
        </StyledBrand>
        <StyledGhostButton onClick={goToLogin}>Sign in</StyledGhostButton>
      </StyledNav>

      <StyledHero>
        <StyledHeroLogo src={LOGO_URL} alt="BeeAX" />
        <StyledEyebrow>Beeax AI Tech · The AI-native CRM</StyledEyebrow>
        <StyledH1>
          The CRM you <StyledGoldText>build, ship, and version</StyledGoldText>{' '}
          like the rest of your stack
        </StyledH1>
        <StyledSubtitle>
          BeeAX gives technical teams the building blocks of a modern CRM —
          objects, views, workflows, and AI agents — and lets you extend
          everything as code.
        </StyledSubtitle>
        <StyledCtaRow>
          <StyledGoldButton onClick={goToLogin}>Get started</StyledGoldButton>
          <StyledGhostButton onClick={goToLogin}>Sign in</StyledGhostButton>
        </StyledCtaRow>
      </StyledHero>
      <StyledBand />

      <StyledFeatures>
        {FEATURES.map((feature) => (
          <StyledCard key={feature.title}>
            <StyledCardIcon>{feature.icon}</StyledCardIcon>
            <StyledCardTitle>{feature.title}</StyledCardTitle>
            <StyledCardBody>{feature.body}</StyledCardBody>
          </StyledCard>
        ))}
      </StyledFeatures>

      <StyledClosing>
        <StyledClosingTitle>Ready to build your CRM?</StyledClosingTitle>
        <StyledClosingText>
          Sign in to your BeeAX workspace and start managing companies, people,
          and opportunities — with AI on your side.
        </StyledClosingText>
        <StyledGoldButton onClick={goToLogin}>
          Sign in to BeeAX
        </StyledGoldButton>
      </StyledClosing>

      <StyledFooter>
        © 2026 Beeax AI Tech Private Limited · BeeAX CRM
      </StyledFooter>
    </StyledPage>
  );
};
