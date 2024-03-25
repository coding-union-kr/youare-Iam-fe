import { GetServerSidePropsContext } from 'next';
import type { NextPageWithLayout } from '@/types/page';
import MainLayout from '@/components/layout/MainLayout';
import { createServerSideInstance } from '@/libs/serversideApi';
import type { UserData } from '@/types/api';
import ShareInviteLink from '@/components/onboarding/ShareInviteLink';
import ChatList from '@/components/chatroom/ChatList';
import SEO from '@/components/SEO/SEO';
import { getUserStatus } from '@/hooks/queries/useUserStatus';
import { revalidateUserStatusCookie } from '@/util/revalidateUserStautCookie';

const Page: NextPageWithLayout<UserData> = (userData) => {
  const { userStatus, linkKey } = userData;

  return (
    <>
      <SEO title="대화 상세" />
      <div>
        {userStatus === 'COUPLE_USER' && <ChatList />}
        {userStatus === 'COUPLE_WAITING_USER' && (
          <ShareInviteLink linkKey={linkKey} />
        )}
      </div>
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const api = createServerSideInstance(context);

  try {
    const userData = await getUserStatus(api);

    // revalidate user status cookie
    revalidateUserStatusCookie(userData.userStatus, context);

    if (userData.userStatus === 'NON_COUPLE_USER') {
      return {
        redirect: {
          destination: '/onboarding',
          permanent: false,
        },
      };
    }

    return { props: userData };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
export default Page;
