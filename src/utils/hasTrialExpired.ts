export function hasTrialExpired(
  createdAt: string,
  trialDays: number = 14,
): boolean {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const trialEndDate = new Date(
    createdDate.getTime() + trialDays * 24 * 60 * 60 * 1000,
  );
  return now > trialEndDate;
}
