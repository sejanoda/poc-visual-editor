export const dataset = assertValue(
    process.env.NEXT_PUBLIC_HYGRAPH_DATASET,
    "Missing environment variable: NEXT_PUBLIC_HYGRAPH_DATASET"
);

export const projectId = assertValue(
    process.env.NEXT_PUBLIC_HYGRAPH_PROJECT_ID,
    "Missing environment variable: NEXT_PUBLIC_HYGRAPH_PROJECT_ID"
);

export const token = assertValue(
    process.env.NEXT_PUBLIC_HYGRAPH_TOKEN,
    "Missing environment variable: NEXT_PUBLIC_HYGRAPH_TOKEN"
);

export const versionApi = assertValue(
    process.env.NEXT_PUBLIC_HYGRAPH_VERSION,
    "Missing environment variable: NEXT_PUBLIC_HYGRAPH_VERSION"
);

export const useCdn = false;

function assertValue<T>(
    environmentVariable: T | undefined,
    errorMessage: string
): T {
    if (environmentVariable === undefined) {
        throw new Error(errorMessage);
    }

    return environmentVariable;
}