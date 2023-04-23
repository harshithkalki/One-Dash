import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/api/root';
import superjson from 'superjson';
import { prisma } from '~/server/db';
import { type GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '~/server/common/get-server-auth-session';

export const createSSG = async (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session: await getServerAuthSession(ctx) },
    transformer: superjson,
});
