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
const PREVIEW_URL = '/images/app-preview.png';

const StyledPage = styled.div`
  background:
    radial-gradient(1200px 480px at 50% -8%, rgba(212, 160, 23, 0.18), transparent 70%),
    ${CREAM};
  color: ${INK};
  height: 100dvh;
  overflow-y: auto;
  width: 100%;
`;

const StyledNav = styled.nav`
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgba(253, 245, 230, 0.7);
  border-bottom: 1px solid rgba(28, 28, 28, 0.06);
  display: flex;
  justify-content: space-between;
  left: 0;
  margin: 0 auto;
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const StyledNavInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1120px;
  width: 100%;
`;

const StyledBrand = styled.div`
  align-items: center;
  display: flex;
  font-size: 19px;
  font-weight: 700;
  gap: 10px;
  letter-spacing: -0.02em;
`;

const StyledBrandLogo = styled.img`
  border-radius: 9px;
  height: 34px;
  width: 34px;
`;

const StyledNavRight = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
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
  transition:
    border-color 0.15s ease,
    background 0.15s ease;
  &:hover {
    background: rgba(212, 160, 23, 0.08);
    border-color: ${GOLD};
  }
`;

const StyledGoldButton = styled.button`
  background: ${GOLD};
  border: none;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(212, 160, 23, 0.32);
  color: ${INK};
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 28px;
  transition:
    background 0.15s ease,
    transform 0.1s ease;
  &:hover {
    background: ${GOLD_LIGHT};
  }
  &:active {
    transform: translateY(1px);
  }
`;

const StyledHero = styled.section`
  margin: 0 auto;
  max-width: 880px;
  padding: 80px 24px 40px;
  text-align: center;
`;

const StyledEyebrow = styled.div`
  align-items: center;
  background: rgba(212, 160, 23, 0.12);
  border: 1px solid rgba(212, 160, 23, 0.3);
  border-radius: 999px;
  color: ${GOLD_DARK};
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  gap: 6px;
  letter-spacing: 0.06em;
  margin-bottom: 24px;
  padding: 6px 14px;
  text-transform: uppercase;
`;

const StyledH1 = styled.h1`
  font-size: 60px;
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.03;
  margin: 0 auto 22px;
  max-width: 820px;
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
  font-size: 20px;
  line-height: 1.55;
  margin: 0 auto 36px;
  max-width: 620px;
`;

const StyledCtaRow = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledHint = styled.div`
  color: ${BODY};
  font-size: 13px;
  margin-top: 18px;
`;

// Product preview, framed like an app window
const StyledPreviewWrap = styled.div`
  margin: 24px auto 0;
  max-width: 1040px;
  padding: 0 24px;
`;

const StyledWindow = styled.div`
  background: ${NAVY};
  border: 1px solid rgba(28, 28, 28, 0.1);
  border-radius: 14px;
  box-shadow: 0 40px 80px -24px rgba(26, 26, 26, 0.4);
  overflow: hidden;
`;

const StyledWindowBar = styled.div`
  align-items: center;
  background: #16202c;
  display: flex;
  gap: 7px;
  padding: 11px 14px;
`;

const StyledDotRed = styled.span`
  background: #ec6a5e;
  border-radius: 999px;
  height: 11px;
  width: 11px;
`;
const StyledDotYellow = styled.span`
  background: #f4bf4f;
  border-radius: 999px;
  height: 11px;
  width: 11px;
`;
const StyledDotGreen = styled.span`
  background: #61c554;
  border-radius: 999px;
  height: 11px;
  width: 11px;
`;

const StyledPreviewImg = styled.img`
  display: block;
  width: 100%;
`;

const StyledSectionHead = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  padding: 96px 24px 8px;
  text-align: center;
`;

const StyledSectionEyebrow = styled.div`
  color: ${GOLD_DARK};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  text-transform: uppercase;
`;

const StyledSectionTitle = styled.h2`
  font-size: 38px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
`;

const StyledFeatures = styled.section`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  max-width: 1120px;
  padding: 40px 24px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled.div`
  background: ${CREAM_CARD};
  border: 1px solid rgba(28, 28, 28, 0.07);
  border-radius: 16px;
  padding: 28px;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    border-color 0.15s ease;
  &:hover {
    border-color: rgba(212, 160, 23, 0.4);
    box-shadow: 0 12px 28px -12px rgba(212, 160, 23, 0.4);
    transform: translateY(-3px);
  }
`;

const StyledCardIcon = styled.div`
  align-items: center;
  background: linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD});
  border-radius: 12px;
  color: ${INK};
  display: flex;
  font-size: 22px;
  height: 46px;
  justify-content: center;
  margin-bottom: 16px;
  width: 46px;
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
  background:
    radial-gradient(600px 200px at 50% 0%, rgba(212, 160, 23, 0.25), transparent 70%),
    ${NAVY};
  border-radius: 24px;
  color: #ffffff;
  margin: 56px auto;
  max-width: 1072px;
  padding: 64px 24px;
  text-align: center;
`;

const StyledClosingTitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
`;

const StyledClosingText = styled.p`
  color: rgba(255, 255, 255, 0.72);
  font-size: 17px;
  margin: 0 auto 28px;
  max-width: 540px;
`;

const StyledFooter = styled.footer`
  align-items: center;
  border-top: 1px solid rgba(28, 28, 28, 0.08);
  color: ${BODY};
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1120px;
  padding: 28px 24px 56px;
`;

const StyledFooterBrand = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
`;

const StyledFooterNote = styled.div`
  font-size: 13px;
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
        <StyledNavInner>
          <StyledBrand>
            <StyledBrandLogo src={LOGO_URL} alt="BeeAX" />
            BeeAX CRM
          </StyledBrand>
          <StyledNavRight>
            <StyledGhostButton onClick={goToLogin}>Sign in</StyledGhostButton>
          </StyledNavRight>
        </StyledNavInner>
      </StyledNav>

      <StyledHero>
        <StyledEyebrow>🐝 Beeax AI Tech · The AI-native CRM</StyledEyebrow>
        <StyledH1>
          The CRM you <StyledGoldText>build, ship & version</StyledGoldText> like
          the rest of your stack
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
        <StyledHint>No credit card · Open-source · Self-hostable</StyledHint>
      </StyledHero>

      <StyledPreviewWrap>
        <StyledWindow>
          <StyledWindowBar>
            <StyledDotRed />
            <StyledDotYellow />
            <StyledDotGreen />
          </StyledWindowBar>
          <StyledPreviewImg src={PREVIEW_URL} alt="BeeAX CRM dashboard" />
        </StyledWindow>
      </StyledPreviewWrap>

      <StyledSectionHead>
        <StyledSectionEyebrow>Everything you need</StyledSectionEyebrow>
        <StyledSectionTitle>A CRM that adapts to you</StyledSectionTitle>
      </StyledSectionHead>
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
        <StyledFooterBrand>
          <StyledBrandLogo src={LOGO_URL} alt="BeeAX" />
          BeeAX CRM
        </StyledFooterBrand>
        <StyledFooterNote>
          © 2026 Beeax AI Tech Private Limited
        </StyledFooterNote>
      </StyledFooter>
    </StyledPage>
  );
};
