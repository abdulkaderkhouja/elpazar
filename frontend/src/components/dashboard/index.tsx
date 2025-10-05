// pages/dashboard/index.tsx
import DashboardLayout from '../../components/ui/Layouts/SolutionLayout';
import type { NextPageWithLayout } from '../../pages/_app';

const DashboardPage: NextPageWithLayout = () => {
  return <div>Dashboard Content Here</div>;
};

DashboardPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
