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

  let oauthProvider = await prisma.oauthProvider.findFirst({
    where: {
      provider: provider, 
      providerId: providerId, 
    },
    include: {
      user: true, 
    },
  });


  if (!oauthProvider) {

    // If OAuth provider entry does not exist, create a new user with OAuth details
    const user = await prisma.user.create({
      data: {
        email: email ?? undefined,  
        avatar: avatar,
        name,
        oauthProviders: {
          create: {
            provider: provider,
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
    console.log('User found with OAuth provider:', oauthProvider.user);
    return oauthProvider.user;
  }
}

export async function findUserByproviderId(provider: string, providerId: string) {
  let oauthProvider = await prisma.oauthProvider.findFirst({
    where: {
      provider: provider,  
      providerId: providerId, 
    },
    include: {
      user: true, 
    },
  });
  //@ts-ignore
  if (oauthProvider) return oauthProvider.user
  else return null
}
export async function findProjectThenCreateProject({name,projectId,formSchema}:{name:string,projectId:string,formSchema:string}) {
  let project = await prisma.project.findFirst({
    where:{
      id:projectId
    }

  })
  if(project){
    const form = await prisma.form.create({data:{name,projectId,formSchema}})
    if(form) return form
    return null
  }
}
