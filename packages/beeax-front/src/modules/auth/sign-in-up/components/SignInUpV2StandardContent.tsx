import { Logo } from '@/auth/components/Logo';
import { Title } from '@/auth/components/Title';
import { FooterNote } from '@/auth/sign-in-up/components/FooterNote';
import { WorkspaceSelectionFooter } from '@/auth/sign-in-up/components/WorkspaceSelectionFooter';
import { SignInUpStep } from '@/auth/states/signInUpStepState';
import { styled } from '@linaria/react';
import { type JSX } from 'react';
import { AppPath } from 'beeax-shared/types';
import { AnimatedEaseIn } from 'beeax-ui/layout';
import { themeCssVariables } from 'beeax-ui/theme-constants';
import { type PublicWorkspaceData } from '~/generated-metadata/graphql';

// BeeAX brand palette (from the Beeax AI Tech brand kit)
const GOLD = '#D4A017';
const GOLD_DARK = '#B8860B';
const INK = '#1A1A1A';
const LOGO_URL = '/images/icons/android/android-launchericon-192-192.png';

const StyledSplit = styled.div`
  display: flex;
  height: 100dvh;
  width: 100%;
`;

const StyledHeroPanel = styled.div`
  align-items: flex-start;
  background: linear-gradient(150deg, #f5d547 0%, ${GOLD} 42%, #e07020 100%);
  color: ${INK};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 64px;
  position: relative;
  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledHeroLogo = styled.img`
  border-radius: 22px;
  box-shadow: 0 16px 48px rgba(26, 26, 26, 0.18);
  height: 88px;
  margin-bottom: 32px;
  width: 88px;
`;

const StyledHeroTitle = styled.h1`
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
  margin: 0 0 16px;
  max-width: 420px;
`;

const StyledHeroSubtitle = styled.p`
  color: rgba(26, 26, 26, 0.72);
  font-size: 18px;
  line-height: 1.5;
  margin: 0 0 32px;
  max-width: 400px;
`;

const StyledHeroList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledHeroItem = styled.li`
  align-items: center;
  color: rgba(26, 26, 26, 0.85);
  display: flex;
  font-size: 15px;
  font-weight: 600;
  gap: 10px;
`;

const StyledDot = styled.span`
  background: ${INK};
  border-radius: 999px;
  height: 6px;
  width: 6px;
`;

const StyledHeroFooter = styled.div`
  bottom: 32px;
  color: rgba(26, 26, 26, 0.55);
  font-size: 13px;
  left: 64px;
  position: absolute;
`;

const StyledFormPanel = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  padding: 48px 24px;
`;

const StyledFormInner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  width: 100%;
`;

type SignInUpV2StandardContentProps = {
  workspacePublicData: PublicWorkspaceData | null;
  signInUpForm: JSX.Element | null;
  signInUpStep: SignInUpStep;
  title: string;
  onClickOnLogo: () => void;
};

export const SignInUpV2StandardContent = ({
  workspacePublicData,
  signInUpForm,
  signInUpStep,
  title,
  onClickOnLogo,
}: SignInUpV2StandardContentProps) => {
  return (
    <StyledSplit>
      <StyledHeroPanel>
        <StyledHeroLogo src={LOGO_URL} alt="BeeAX" />
        <StyledHeroTitle>The AI-native CRM, built your way.</StyledHeroTitle>
        <StyledHeroSubtitle>
          Companies, people, pipelines, workflows, and AI agents — all in one
          workspace you can shape like the rest of your stack.
        </StyledHeroSubtitle>
        <StyledHeroList>
          <StyledHeroItem>
            <StyledDot /> Custom objects with real APIs
          </StyledHeroItem>
          <StyledHeroItem>
            <StyledDot /> Workflows & automation
          </StyledHeroItem>
          <StyledHeroItem>
            <StyledDot /> Native AI agents
          </StyledHeroItem>
        </StyledHeroList>
        <StyledHeroFooter>
          © 2026 Beeax AI Tech Private Limited
        </StyledHeroFooter>
      </StyledHeroPanel>

      <StyledFormPanel>
        <StyledFormInner>
          <AnimatedEaseIn>
            <Logo
              secondaryLogo={workspacePublicData?.logo}
              placeholder={workspacePublicData?.displayName}
              onClick={onClickOnLogo}
              to={AppPath.SignInUpV2}
            />
          </AnimatedEaseIn>
          <Title animate>{title}</Title>
          {signInUpForm}
          {signInUpStep === SignInUpStep.WorkspaceSelection && (
            <WorkspaceSelectionFooter />
          )}
          {![
            SignInUpStep.Password,
            SignInUpStep.TwoFactorAuthenticationProvision,
            SignInUpStep.TwoFactorAuthenticationVerification,
            SignInUpStep.WorkspaceSelection,
            SignInUpStep.WorkspaceCreation,
          ].includes(signInUpStep) && (
            <FooterNote secondaryAgreement="dataProcessingAgreement" />
          )}
        </StyledFormInner>
      </StyledFormPanel>
    </StyledSplit>
  );
};
