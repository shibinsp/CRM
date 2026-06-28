import { pathExists, readJson } from '@/cli/utilities/file/fs-utils';
import path from 'path';
import { isDefined } from 'beeax-shared/utils';

type PackageJsonDependencies = {
  dependencies?: Record<string, string>;
};

// Neither BeeAX SDK package needs to be resolved by the published app at
// runtime, so both must live in "devDependencies":
// - beeax-sdk ships the CLI and build/scaffolding tooling used only at dev and
//   build time, and is never imported by the published app's runtime.
// - beeax-client-sdk is imported by app code but is provided at runtime by
//   BeeAX's injected SDK (Lambda SDK layer / server-served modules), so the
//   app's installed copy is only needed for typecheck/build.
// Keeping either under "dependencies" pulls it into the Lambda deps layer.
const BUILD_TIME_DEPENDENCY_WARNINGS: Record<string, string> = {
  'beeax-sdk':
    '"beeax-sdk" is listed under "dependencies" in package.json. It is a build-time only tool and should be moved to "devDependencies".',
  'beeax-client-sdk':
    '"beeax-client-sdk" is listed under "dependencies" in package.json. It is provided at runtime by BeeAX\'s injected SDK and should be moved to "devDependencies".',
};

export const validatePackageJsonDependencies = async (
  appPath: string,
): Promise<string[]> => {
  const packageJsonPath = path.join(appPath, 'package.json');

  if (!(await pathExists(packageJsonPath))) {
    return [];
  }

  const packageJson = await readJson<PackageJsonDependencies>(packageJsonPath);

  return Object.entries(BUILD_TIME_DEPENDENCY_WARNINGS)
    .filter(([packageName]) =>
      isDefined(packageJson.dependencies?.[packageName]),
    )
    .map(([, warning]) => warning);
};
