import { prisma } from "..";
export async function findOrCreateUserWithOauth(
  provider: string,
  providerId: string,
  accessToken: string,
  refreshToken: string,
  name: string,
  avatar: string,
  email?: string
) {
  // Try to find the OAuth provider by provider and providerId
  let oauthProvider = await prisma.oauthProvider.findFirst({
    where: {
      provider: provider,  // Search by provider
      providerId: providerId, // and providerId
    },
    include: {
      user: true, // Include the related User model
    },
  });


  if (!oauthProvider) {
    // If OAuth provider entry does not exist, create a new user with OAuth details
    const user = await prisma.user.create({
      data: {
        email: email ?? undefined,  // Email is optional, use undefined if email is not provided
        avatar: avatar,
        name,
        oauthProviders: {
          create: {
            provider:provider,
            providerId: providerId,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        },
      },
    });
    console.log('New user created with OAuth:', user);
    return user;
  } else {
    //@ts-ignore
    console.log('User found with OAuth provider:', oauthProvider.user);
    //@ts-ignore
    return oauthProvider.user;
  }
}

export async function findUserByproviderId(provider: string, providerId: string) {
  let oauthProvider = await prisma.oauthProvider.findFirst({
    where: {
      provider: provider,  // Search by provider
      providerId: providerId, // and providerId
    },
    include: {
      user: true, // Include the related User model
    },
  });
  //@ts-ignore
  if (oauthProvider) return oauthProvider.user
  else return null
}
